import { config } from './index.js'
import { fileURLToPath } from 'url'
import path from 'path'
import swaggerJsdoc from 'swagger-jsdoc'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express JWT API',
      version: '1.0.0',
      description: 'RESTful API with JWT authentication',
    },
    servers: [{ url: `${config.apiBaseUrl}` }],
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
  apis: [path.resolve(__dirname, '../routes/*.js'), path.resolve(__dirname, '../routes/api/*.js')],
}

export const swaggerSpec = swaggerJsdoc(swaggerOptions)
