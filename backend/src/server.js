import app from './app.js'
import db from './models/index.js'
import redisClient from './config/redis.config.js'
import logger from './utils/logger.js'

const port = process.env.PORT || 3000

const startServer = async () => {
  try {
    // Test database connection
    await db.sequelize.authenticate()
    logger.info('Database connection has been established successfully.')

    // Test Redis connection
    await redisClient.ping()
    logger.info('Redis connection has been established successfully.')

    app.listen(port, () => {
      logger.info(`Server running on port ${port}`)
      logger.info(`API docs available at http://localhost:${port}/api-docs`)
    })
  } catch (error) {
    logger.error('Unable to start server:', error)
    process.exit(1)
  }
}

startServer()

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...')
  server.close(() => {
    logger.info('Server closed.')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully...')
  server.close(() => {
    logger.info('Server closed.')
    process.exit(0)
  })
})
