import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import httpStatus from 'http-status'
import rateLimit from 'express-rate-limit'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import routes from './routes/index.js'
import { errorConverter, errorHandler } from './middleware/error.middleware.js'
import ApiError from './utils/ApiError.js'
import { responseEnhancer } from './middleware/responseEnhancer.middleware.js'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

// Security middleware
app.use(helmet())

// Enable CORS
app.use(cors())
app.options('*', cors())

// Parse JSON bodies
app.use(express.json())

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }))

// Enhance Reponse
app.use(responseEnhancer);

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})
app.use(limiter)

// API routes
app.use('/api', routes)

// API documentation
if (process.env.NODE_ENV !== 'production') {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Express JWT API',
        version: '1.0.0',
        description: 'RESTful API with JWT authentication',
      },
      servers: [
        {
          url: `${process.env.API_BASE_URL}/api`,
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    apis: [path.resolve(__dirname, './routes/*.js')],
  }

  const specs = swaggerJsdoc(options)
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}

// Send 404 for any unknown API request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// Convert error to ApiError, if needed
app.use(errorConverter)

// Handle error
app.use(errorHandler)

export default app
