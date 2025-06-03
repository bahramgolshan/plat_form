import redisClient from '../config/redis'
import ApiError from '../utils/apiError'
import logger from '../utils/logger'

const setValue = async (key, value, ttl = null) => {
  try {
    if (ttl) {
      await redisClient.set(key, value, 'EX', ttl)
    } else {
      await redisClient.set(key, value)
    }
  } catch (error) {
    logger.error('Redis set error:', error)
    throw new ApiError(500, 'Redis operation failed')
  }
}

const getValue = async (key) => {
  try {
    return await redisClient.get(key)
  } catch (error) {
    logger.error('Redis get error:', error)
    throw new ApiError(500, 'Redis operation failed')
  }
}

const deleteKey = async (key) => {
  try {
    await redisClient.del(key)
  } catch (error) {
    logger.error('Redis delete error:', error)
    throw new ApiError(500, 'Redis operation failed')
  }
}

const blacklistToken = async (token, expiresIn) => {
  try {
    await redisClient.set(`blacklist:${token}`, '1', 'EX', expiresIn)
  } catch (error) {
    logger.error('Redis blacklist error:', error)
    throw new ApiError(500, 'Failed to blacklist token')
  }
}

const isTokenBlacklisted = async (token) => {
  try {
    return await redisClient.exists(`blacklist:${token}`)
  } catch (error) {
    logger.error('Redis blacklist check error:', error)
    throw new ApiError(500, 'Failed to check token blacklist')
  }
}

export default { setValue, getValue, deleteKey, blacklistToken, isTokenBlacklisted }
