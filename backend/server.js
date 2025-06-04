import app from './src/app.js'
import { sequelize } from './src/models/index.js'
import redisClient from './src/config/redis.config.js'
import logger from './src/utils/logger.js'
import { config } from './src/config/index.js'

const port = config.port || 3000
let server

const startServer = async () => {
  try {
    // Test external connections in parallel
    await Promise.all([sequelize.authenticate(), redisClient.ping()])

    logger.info('Database connection established successfully.')
    logger.info('Redis connection established successfully.')

    server = app.listen(port, () => {
      logger.info(`Server running on port ${port}`)
      logger.info(`API docs: http://localhost:${port}/api-docs`)
    })
  } catch (error) {
    logger.error('Unable to start server:', error)
    process.exit(1)
  }
}

const shutdown = (signal) => {
  logger.info(`${signal} received. Shutting down gracefully...`)
  if (server) {
    server.close(() => {
      logger.info('HTTP server closed.')
      process.exit(0)
    })
  } else {
    process.exit(0)
  }
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))

startServer()
