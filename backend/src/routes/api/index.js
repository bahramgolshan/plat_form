import express from 'express'
import publicRoutes from './public.route.js'
import authenticatedRoutes from './authenticated.route.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Public
 *   description: Public endpoints
 */
router.use(publicRoutes)

/**
 * @swagger
 * tags:
 *   name: Authenticated
 *   description: Authenticated endpoints
 */
router.use(authenticatedRoutes)

export default router
