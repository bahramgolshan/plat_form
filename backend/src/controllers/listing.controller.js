import { ListingService } from '../services/listing.service.js'

const listingService = new ListingService()

const getListings = async (req, res, next) => {
  try {
    const result = await listingService.getListings(req.query)
    res.json({ success: true, ...result })
  } catch (error) {
    next(error)
  }
}

const getListingDetails = async (req, res, next) => {
  try {
    const listing = await listingService.getListingDetails(req.params.id)
    if (!listing) {
      return res.status(404).json({ success: false, error: 'Listing not found' })
    }
    res.json({ success: true, data: listing })
  } catch (error) {
    next(error)
  }
}

const checkAvailability = async (req, res, next) => {
  try {
    const availability = await listingService.checkAvailability(req.params.id, req.query.date)
    res.json({ success: true, data: availability })
  } catch (error) {
    next(error)
  }
}

const getFeaturedListings = async (req, res, next) => {
  try {
    const listings = await listingService.getFeaturedListings()
    res.json({ success: true, data: listings })
  } catch (error) {
    next(error)
  }
}

export default {
  getListings,
  getListingDetails,
  checkAvailability,
  getFeaturedListings,
}
