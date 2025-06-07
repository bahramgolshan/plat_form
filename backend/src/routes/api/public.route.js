import express from 'express'
import { validate } from '../../middlewares/validate.middleware.js'
import authValidation from '../../validations/auth.validation.js'
import authController from '../../controllers/auth.controller.js'
import listingController from '../../controllers/listing.controller.js'
import categoryController from '../../controllers/category.controller.js'
import locationController from '../../controllers/location.controller.js'
import reviewController from '../../controllers/review.controller.js'
import tagController from '../../controllers/tag.controller.js'

const router = express.Router()

// Listings
router.get('/listings', listingController.getListings) // --Browse listings (filterable by category, location, dates, etc.)
router.get('/listings/search', listingController.searchListings) // --Search listings by keyword
router.get('/listings/nearby', listingController.getNearbyListings) // --Get listings near a location
router.get('/listings/:id', listingController.getListingDetails) // --Get listing details
router.get('/listings/:id/availability', listingController.checkAvailability) // --Check listing availability
router.get('/listings/:id/reviews', reviewController.getListingReviews) // --Get listing reviews
router.get('/listings/:id/images', listingController.getListingImages) // --Get listing images
router.get('/listings/featured', listingController.getFeaturedListings) // --Get featured listings

// Locations
router.get('/locations', locationController.searchLocations) // --Browse locations (cities, regions, etc.)
router.get('/locations/:id', locationController.getLocationDetails) // --Get location details
router.get('/locations/popular', locationController.getPopularLocations) // --Get popular destinations

// Categories
router.get('/categories', categoryController.getCategories) // --Browse categories
router.get('/categories/:id', categoryController.getCategoryDetails) // --Get category details

// Tags
router.get('/tags', tagController.getTags) // --Browse tags
router.get('/tags/popular', tagController.getPopularTags) // --Get popular tags

// Authentication
router.post('/register', validate(authValidation.register), authController.register)
router.post('/login', validate(authValidation.login), authController.login)
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens)
router.post('/logout', validate(authValidation.logout), authController.logout)
router.post(
  '/forgot-password',
  validate(authValidation.forgotPassword),
  authController.forgotPassword
)
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword)
router.get('/verify-email', authController.verifyEmail)

export default router
