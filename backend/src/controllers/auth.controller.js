import httpStatus from 'http-status'
import authService from '../services/auth.service.js'

const register = async (req, res, next) => {
  try {
    const { user, roles, tokens } = await authService.register(req.body)

    const responseData = { user, roles, tokens }
    res.api(httpStatus.CREATED, 'success', responseData)
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { user, roles, tokens } = await authService.loginWithEmailAndPassword(email, password)

    const responseData = { user, roles, tokens }
    res.api(httpStatus.OK, 'success', responseData)
  } catch (error) {
    next(error)
  }
}

const refreshTokens = async (req, res, next) => {
  try {
    const { refreshToken } = req.body
    const { access, user } = await authService.refreshAuthToken(refreshToken)

    const responseData = { access, user }
    res.api(httpStatus.OK, 'success', responseData)
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body
    console.log('errrrrrooooorrrrrrr \n', refreshToken)
    await authService.logout(refreshToken)
    res.api(httpStatus.NO_CONTENT)
  } catch (error) {
    next(error)
  }
}

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body
    await authService.sendPasswordResetEmail(email)

    res.api(httpStatus.OK, 'Password reset email sent')
  } catch (error) {
    next(error)
  }
}

const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body
    await authService.resetPassword(token, password)
    res.api(httpStatus.OK, 'Password reset successful')
  } catch (error) {
    next(error)
  }
}

const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query
    await authService.verifyEmail(token)
    res.api(httpStatus.OK, 'Email Verified successfully!')
  } catch (error) {
    next(error)
  }
}

export default {
  register,
  login,
  refreshTokens,
  logout,
  forgotPassword,
  resetPassword,
  verifyEmail,
}
