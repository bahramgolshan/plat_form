import { Wishlist } from '../models/index.js'

export class WishlistService {
  async addToWishlist(customerId, listingId) {
    const [wishlistItem] = await Wishlist.findOrCreate({
      where: { customerId, listingId },
      defaults: { customerId, listingId },
    })
    return wishlistItem
  }

  async getWishlist(customerId) {
    return await Wishlist.findAll({
      where: { customerId },
      include: [{ model: Listing }],
    })
  }
}
