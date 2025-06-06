import express from 'express'
import listingController from '../../controllers/listing.controller.js'
import categoryController from '../../controllers/category.controller.js'
import locationController from '../../controllers/location.controller.js'
import searchController from '../../controllers/search.controller.js'
import reviewController from '../../controllers/review.controller.js'

const router = express.Router()

// Listings & Discovery
router.get('/listings', listingController.getListings)
router.get('/listings/featured', listingController.getFeaturedListings)
router.get('/listings/:id', listingController.getListingDetails)
router.get('/listings/:id/availability', listingController.checkAvailability)
router.get('/listings/:id/reviews', reviewController.getListingReviews)

// Categories
router.get('/categories', categoryController.getCategories)

// Locations
router.get('/locations', locationController.searchLocations)

// Search
router.get('/search', searchController.fullTextSearch)
router.get('/search/suggestions', searchController.getSearchSuggestions)

export default router
