import jwt from 'jsonwebtoken'
import ApiError from '../utils/api-error.util.js'
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

export const checkIdempotency = (req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    const idempotencyKey = req.headers['x-idempotency-key']
    if (!idempotencyKey) {
      return res.status(428).json({
        success: false,
        error: 'Idempotency key required',
      })
    }
    // Check if key was already processed (implement your cache/db check here)
    next()
  } else {
    next()
  }
}
