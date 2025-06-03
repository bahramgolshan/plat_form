import { createClient } from 'redis'
import dotenv from 'dotenv'
import logger from '../utils/logger.js'

dotenv.config()

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  password: process.env.REDIS_PASSWORD,
})

redisClient.on('connect', () => {
  logger.info('Connected to Redis')
})

redisClient.on('error', (err) => logger.error('Redis error:', err))

await redisClient.connect()

export default redisClient
