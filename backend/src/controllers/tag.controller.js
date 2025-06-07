import ApiResponse from '../utils/api-response.util.js'
import httpStatus from 'http-status'
import { tagService } from '../services/tag.service.js'

const getTags = async (req, res, next) => {
  try {
    const { limit = 50, offset = 0 } = req.query
    const tags = await tagService.getAllTags({
      limit: parseInt(limit),
      offset: parseInt(offset),
    })
    res
      .status(httpStatus.OK)
      .json(new ApiResponse(httpStatus.OK, tags, 'Tags retrieved successfully'))
  } catch (error) {
    next(error)
  }
}

const getPopularTags = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query
    const tags = await tagService.getPopularTags(parseInt(limit))
    res
      .status(httpStatus.OK)
      .json(new ApiResponse(httpStatus.OK, tags, 'Popular tags retrieved successfully'))
  } catch (error) {
    next(error)
  }
}

export default {
  getTags,
  getPopularTags,
}
