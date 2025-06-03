import express from 'express'
import { authenticate, authorize } from '../middleware/auth.middleware.js'
// import * as adminController from '../controllers/admin.controller.js'

const router = express.Router()

router.use(authenticate)
router.use(authorize('admin'))

// Admin-specific routes would go here

export default router
