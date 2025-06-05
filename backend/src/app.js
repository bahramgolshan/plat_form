import { config } from './config/index.js'
import { errorConverter, errorHandler } from './middlewares/error.middleware.js'
import { swaggerSpec } from './config/swagger.config.js'
import ApiError from './utils/ApiError.js'
import applyMiddleware from './middlewares/index.js'
import express from 'express'
import httpStatus from 'http-status'
import router from './routes/index.js' // Import the main router
import swaggerUi from 'swagger-ui-express'

const app = express()

// Middlewares
applyMiddleware(app)

// Use the routes from index.js (including root and health routes)
app.use(router)

// API documentation
if (config.environment !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

// Send 404 for any unknown API request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

app.use(errorConverter) // Convert error to ApiError, if needed
app.use(errorHandler) // Handle error

export default app
