import { config } from './config/index.js'
import { errorConverter, errorHandler } from './middleware/error.middleware.js'
import { swaggerSpec } from './config/swagger.js'
import ApiError from './utils/ApiError.js'
import applyMiddleware from './middleware/index.js'
import dotenv from 'dotenv'
import express from 'express'
import httpStatus from 'http-status'
import routes from './routes/index.js'
import swaggerUi from 'swagger-ui-express'

dotenv.config()

const app = express()

// Middlewares
applyMiddleware(app)

// API routes
app.use('/api', routes)

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
