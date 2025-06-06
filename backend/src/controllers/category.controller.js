import { CategoryService } from '../services/category.service.js'

const categoryService = new CategoryService()

const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getActiveCategories()
    res.json({ success: true, data: categories })
  } catch (error) {
    next(error)
  }
}

export default {
  getCategories,
}
