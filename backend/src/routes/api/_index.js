import express from 'express'
import httpStatus from 'http-status'
import publicRoutes from './public.route.js'
import authenticatedRoutes from './authenticated.route.js'
import authRoutes from './_auth.route.js'
import adminRoutes from './_admin.route.js'
import userRoutes from './_user.route.js'
import { authenticate } from '../../middlewares/auth.middleware.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Public
 *   description: Public endpoints
 */
router.use(publicRoutes)

router.use(authenticatedRoutes)

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
