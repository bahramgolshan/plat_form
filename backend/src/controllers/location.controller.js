import { LocationService } from '../services/location.service.js'

const locationService = new LocationService()

const searchLocations = async (req, res, next) => {
  try {
    const locations = await locationService.searchLocations(req.query.q)
    res.json({ success: true, data: locations })
  } catch (error) {
    next(error)
  }
}

export default {
  searchLocations,
}
