import express from 'express'
import { authenticate } from '../../middlewares/auth.middleware.js'
import { validate } from '../../middlewares/validate.middleware.js'
import listingController from '../../controllers/listing.controller.js'

const router = express.Router()

router.use(authenticate)

// User Profile
router.get('/me', listingController.getListings) // --Get current user profile
router.put('/me', listingController.getListings) // --Update profile
router.put('/me/password', listingController.getListings) // --Change password
router.delete('me', listingController.getListings) // --Delete account (soft delete)

// Payment Methods
router.get('/me/payment-methods', listingController.getListings) // --Get user's payment methods
router.post('/me/payment-methods', listingController.getListings) // --Add payment method
router.put('/me/payment-methods/:id', listingController.getListings) // --Update payment method
router.delete('me/payment-methods/:id', listingController.getListings) // --Remove payment method

// Bookings
router.get('/me/bookings', listingController.getListings) // --Get user's bookings
router.get('/me/bookings/:id', listingController.getListings) // --Get booking details
router.post('/me/bookings', listingController.getListings) // --Create new booking
router.put('/me/bookings/:id/cancel', listingController.getListings) // --Cancel booking
router.get('/me/bookings/:id/invoice', listingController.getListings) // --Get booking invoice

// Reviews
router.get('/me/reviews', listingController.getListings) // --Get user's reviews
router.post('/me/bookings/:id/review', listingController.getListings) // --Create review for booking
router.put('/me/reviews/:id', listingController.getListings) // --Update review
router.delete('me/reviews/:id', listingController.getListings) // --Delete review

// Favorites
router.get('/me/favorites', listingController.getListings) // --Get favorite listings
router.post('/me/favorites/:listingId', listingController.getListings) // --Add to favorites
router.delete('me/favorites/:listingId', listingController.getListings) // --Remove from favorites

// Messages
router.get('/me/messages', listingController.getListings) // --Get user messages
router.post('/me/messages', listingController.getListings) // --Send message to supplier
router.get('/me/messages/:id', listingController.getListings) // --Get message thread

// Notifications
router.get('/me/notifications', listingController.getListings) // --Get user notifications
router.put('/me/notifications/:id/read', listingController.getListings) // --Mark notification as read
router.put('/me/notifications/read-all', listingController.getListings) // --Mark all notifications as read

export default router
