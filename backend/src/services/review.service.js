import { db } from '../models/index.js'

const { Review } = db

export class ReviewService {
  async getListingReviews(listingId) {
    return await Review.findAll({
      where: { listingId },
      order: [['createdAt', 'DESC']],
    })
  }

  async createReview(customerId, listingId, { rating, comment }) {
    return await Review.create({
      customerId,
      listingId,
      rating,
      comment,
    })
  }
}
