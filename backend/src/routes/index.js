import express from 'express'
import httpStatus from 'http-status'
import routes from './api/index.js'
import { config } from '../config/index.js'

const router = express.Router()

// Root route
router.get('/', (req, res) => {
  res.api(httpStatus.OK, `API is running in ${config.environment} mode!`)
})

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Not Found
 */
router.get('/health', (req, res) => {
  res.api(httpStatus.OK, 'healthy')
})

// API routes
router.use('/api', routes)

export default router
