import ApiResponse from '../utils/api-response.util.js'
import httpStatus from 'http-status'
import CategoryService from '../services/category.service.js'

const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getActiveCategories()
    res.json({ success: true, data: categories })
  } catch (error) {
    next(error)
  }
}

const getCategoryDetails = async (req, res, next) => {
  try {
    const { id } = req.params
    const category = await categoryService.getCategoryWithAttributes(id)
    res
      .status(httpStatus.OK)
      .json(new ApiResponse(httpStatus.OK, category, 'Category details retrieved successfully'))
  } catch (error) {
    next(error)
  }
}

export default {
  getCategories,
  getCategoryDetails,
}
