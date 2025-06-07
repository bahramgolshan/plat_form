import ListingService from '../services/listing.service.js'

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

const searchListings = async (req, res, next) => {
  try {
    const { keyword, category, minPrice, maxPrice, limit = 10, offset = 0 } = req.query
    const listings = await listingService.searchListings({
      keyword,
      category,
      minPrice,
      maxPrice,
      limit: parseInt(limit),
      offset: parseInt(offset),
    })
    res
      .status(httpStatus.OK)
      .json(new ApiResponse(httpStatus.OK, listings, 'Listings retrieved successfully'))
  } catch (error) {
    next(error)
  }
}

const getNearbyListings = async (req, res, next) => {
  try {
    const { lat, lng, radius = 10, limit = 10, offset = 0 } = req.query
    const listings = await listingService.getNearbyListings({
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
      radius: parseFloat(radius),
      limit: parseInt(limit),
      offset: parseInt(offset),
    })
    res
      .status(httpStatus.OK)
      .json(new ApiResponse(httpStatus.OK, listings, 'Nearby listings retrieved successfully'))
  } catch (error) {
    next(error)
  }
}

const getListingImages = async (req, res, next) => {
  try {
    const { id } = req.params
    const images = await listingService.getListingImages(id)
    res
      .status(httpStatus.OK)
      .json(new ApiResponse(httpStatus.OK, images, 'Listing images retrieved successfully'))
  } catch (error) {
    next(error)
  }
}

export default {
  getListings,
  getListingDetails,
  checkAvailability,
  getFeaturedListings,
  searchListings,
  getNearbyListings,
  getListingImages,
}
