import { createClient } from 'redis'
import logger from '../utils/logger.util.js'
import { config } from './index.js'

const redisClient = createClient({
  socket: {
    host: config.redisHost,
    port: config.redisPort,
  },
  password: config.redisPassword,
})

redisClient.on('connect', () => {
  logger.info('Connected to Redis')
})

redisClient.on('error', (err) => logger.error('Redis error:', err))

await redisClient.connect()

export default redisClient
