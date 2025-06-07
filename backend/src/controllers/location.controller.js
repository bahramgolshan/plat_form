import ApiResponse from '../utils/api-response.util.js'
import httpStatus from 'http-status'
import { locationService } from '../services/location.service.js'

const getLocationDetails = async (req, res, next) => {
  try {
    const { id } = req.params
    const location = await locationService.getLocationById(id)
    res
      .status(httpStatus.OK)
      .json(new ApiResponse(httpStatus.OK, location, 'Location details retrieved successfully'))
  } catch (error) {
    next(error)
  }
}

const getPopularLocations = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query
    const locations = await locationService.getPopularLocations(parseInt(limit))
    res
      .status(httpStatus.OK)
      .json(new ApiResponse(httpStatus.OK, locations, 'Popular locations retrieved successfully'))
  } catch (error) {
    next(error)
  }
}

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
  getLocationDetails,
  getPopularLocations,
}
