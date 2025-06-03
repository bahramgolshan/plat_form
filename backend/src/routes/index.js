import express from 'express'
import httpStatus from 'http-status'
import authRoutes from './auth.routes.js'
import adminRoutes from './admin.routes.js'
import userRoutes from './user.routes.js'

const router = express.Router()

// Health check endpoint

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
router.get('/health', (req, res) => res.api(httpStatus.OK, 'Breathing...'))

// API routes
router.use('/auth', authRoutes)
router.use('/admin', adminRoutes)
router.use('/users', userRoutes)

export default router
