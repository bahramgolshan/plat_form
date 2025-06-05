import jwt from 'jsonwebtoken'
import ApiError from '../utils/ApiError.js'
import authService from '../services/auth.service.js'
import { db } from '../models/index.js'
import { config } from '../config/index.js'

const { User } = db

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      throw new ApiError(401, 'Authentication required')
    }

    // Check if token is blacklisted
    if (await authService.isTokenBlacklisted(token)) {
      throw new ApiError(401, 'Token revoked')
    }

    const payload = jwt.verify(token, config.jwtSecret)
    if (payload.type !== 'access') {
      throw new ApiError(401, 'Invalid token type')
    }

    const user = await User.findByPk(payload.sub)
    if (!user) {
      throw new ApiError(401, 'User not found')
    }

    req.user = user
    next()
  } catch (error) {
    next(new ApiError(401, error.message))
  }
}

export const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles]
  }

  return (req, res, next) => {
    if (roles.length && !roles.includes(req.user.role)) {
      next(new ApiError(403, 'Forbidden'))
      return
    }
    next()
  }
}
