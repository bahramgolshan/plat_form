import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import httpStatus from 'http-status'
import { v4 as uuidv4 } from 'uuid'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import ApiError from '../utils/ApiError.js'
import db from '../models/index.js'
import redisClient from '../config/redis.config.js'
import emailService from '../services/email.service.js'
import logger from '../utils/logger.js'

dotenv.config()

const { User, RefreshToken, PasswordResetToken } = db

const generateToken = (userId, expires, type, secret = process.env.JWT_SECRET) => {
  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: expires,
    type,
  }
  return jwt.sign(payload, secret)
}

const saveRefreshToken = async (token, userId, expires) => {
  await RefreshToken.create({
    token,
    user_id: userId,
    expires_at: new Date(expires * 1000),
  })
}

const generateAuthTokens = async (user) => {
  const accessTokenExpires =
    Math.floor(Date.now() / 1000) + parseInt(process.env.JWT_ACCESS_EXPIRATION_MINUTES) * 60
  const accessToken = generateToken(user.id, accessTokenExpires, 'access')

  const refreshTokenExpires =
    Math.floor(Date.now() / 1000) + parseInt(process.env.JWT_REFRESH_EXPIRATION_DAYS) * 24 * 60 * 60
  const refreshToken = generateToken(user.id, refreshTokenExpires, 'refresh')
  await saveRefreshToken(refreshToken, user.id, refreshTokenExpires)

  return {
    access: {
      token: accessToken,
      expires: new Date(accessTokenExpires * 1000),
    },
    refresh: {
      token: refreshToken,
      expires: new Date(refreshTokenExpires * 1000),
    },
  }
}

const register = async (userData) => {
  if (await User.findOne({ where: { email: userData.email } })) {
    throw new ApiError(400, 'Email already taken')
  }
  const hashedPassword = await bcrypt.hash(userData.password, 10)
  const verificationToken = uuidv4()

  const user = await User.create({
    ...userData,
    password: hashedPassword,
    isEmailVerified: false,
    verificationToken: verificationToken,
  })

  const [tokens] = await Promise.all([
    await generateAuthTokens(user),
    await sendVerificationEmail(user),
  ])

  return { user, tokens }
}

const loginWithEmailAndPassword = async (email, password) => {
  const user = await User.scope('withPassword').findOne({ where: { email } })
  if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(401, 'Incorrect email or password')
  }

  user.last_login_at = new Date()
  await user.save()

  const tokens = await generateAuthTokens(user)

  return { user, tokens }
}

const refreshAuthToken = async (refreshToken) => {
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET)
    if (payload.type !== 'refresh') {
      throw new Error('Invalid token type')
    }

    const refreshTokenDoc = await RefreshToken.findOne({
      where: {
        token: refreshToken,
        user_id: payload.sub,
      },
    })

    if (!refreshTokenDoc || refreshTokenDoc.expires_at < new Date()) {
      throw new Error('Token not found or expired')
    }

    await refreshTokenDoc.destroy()

    const user = await User.findByPk(payload.sub)
    if (!user) {
      throw new Error('User not found')
    }

    return await generateAuthTokens(user)
  } catch (error) {
    throw new ApiError(401, 'Invalid refresh token')
  }
}

const logout = async (refreshToken) => {
  const refreshTokenDoc = await RefreshToken.findOne({
    where: {
      token: refreshToken,
    },
  })

  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Token not found')
  }

  await refreshTokenDoc.destroy()
}

const blacklistToken = async (token, expiresIn) => {
  await redisClient.set(`blacklist:${token}`, 'true', {
    EX: expiresIn,
  })
}

const resetPassword = async (token, newPassword) => {
  const passwordResetToken = await PasswordResetToken.findOne({
    where: { token },
    include: [{ model: User, as: 'user' }],
  })

  if (
    !passwordResetToken ||
    passwordResetToken.expires_at < new Date() ||
    passwordResetToken.used
  ) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid or expired token')
  }

  const user = passwordResetToken.user
  user.password = await bcrypt.hash(newPassword, 10)
  await user.save()

  passwordResetToken.used = true
  await passwordResetToken.save()

  // Invalidate all refresh tokens for this user
  await RefreshToken.destroy({ where: { user_id: user.id } })
}

const isTokenBlacklisted = async (token) => {
  const result = await redisClient.get(`blacklist:${token}`)
  return result === 'true'
}

const sendPasswordResetEmail = async (email) => {
  const user = await User.findOne({ where: { email } })
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No user found with this email')
  }

  const token = uuidv4()
  const expiresAt = new Date(Date.now() + 3600000) // 1 hour

  await PasswordResetToken.create({
    token,
    user_id: user.id,
    expires_at: expiresAt,
  })

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: 'Password Reset',
    html: `
      <p>You requested a password reset. Click the link below to set a new password:</p>
      <p><a href="${resetUrl}">Reset Password</a></p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  })

  return token
}

const sendVerificationEmail = async (user) => {
  // console.log('here', user)
  const verificationToken = user.verificationToken
  const verificationUrl = `${process.env.API_BASE_URL}/api/auth/verify-email?token=${verificationToken}`

  const emailText = `Please verify your email by clicking on this link: ${verificationUrl}`
  const emailHtml = `<p>Please verify your email by clicking on this link: <a href="${verificationUrl}">Verify Email</a></p>`

  await emailService.sendEmail({
    to: user.email,
    subject: 'Email Verification',
    text: emailText,
    html: emailHtml,
  })
}

const verifyEmail = async (verificationToken) => {
  const user = await User.findOne({ where: { verificationToken } })
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid verification token')
  }

  await user.update({
    isEmailVerified: true,
    verificationToken: null,
  })

  return user
}

export default {
  register,
  verifyEmail,
  loginWithEmailAndPassword,
  refreshAuthToken,
  logout,
  blacklistToken,
  isTokenBlacklisted,
  sendPasswordResetEmail,
  resetPassword,
}
