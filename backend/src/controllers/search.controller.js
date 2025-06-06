import { SearchService } from '../services/search.service.js'

const searchService = new SearchService()

const fullTextSearch = async (req, res, next) => {
  try {
    const result = await searchService.fullTextSearch(
      req.query.q,
      parseInt(req.query.limit) || 10,
      parseInt(req.query.offset) || 0
    )
    res.json({ success: true, ...result })
  } catch (error) {
    next(error)
  }
}

const getSearchSuggestions = async (req, res, next) => {
  try {
    const suggestions = await searchService.getSearchSuggestions(req.query.q)
    res.json({ success: true, data: suggestions })
  } catch (error) {
    next(error)
  }
}

export default {
  fullTextSearch,
  getSearchSuggestions,
}
