import { ReviewService } from '../services/review.service.js'

const reviewService = new ReviewService()

const getListingReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getListingReviews(req.params.id)
    res.json({ success: true, data: reviews })
  } catch (error) {
    next(error)
  }
}

const createReview = async (req, res, next) => {
  try {
    const review = await reviewService.createReview(req.user.userId, req.params.id, req.body)
    res.status(201).json({ success: true, data: review })
  } catch (error) {
    next(error)
  }
}

export default {
  getListingReviews,
  createReview,
}
