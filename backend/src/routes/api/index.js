import express from 'express'
import httpStatus from 'http-status'
import authRoutes from './auth.routes.js'
import adminRoutes from './admin.routes.js'
import userRoutes from './user.routes.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */
router.use('/auth', authRoutes)

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */
router.use('/users', userRoutes)

/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: Admin management endpoints
 */
router.use('/admin', adminRoutes)

export default router
