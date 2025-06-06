import { WishlistService } from '../services/wishlist.service.js'

const wishlistService = new WishlistService()

const addToWishlist = async (req, res, next) => {
  try {
    const wishlistItem = await wishlistService.addToWishlist(req.user.userId, req.body.listingId)
    res.status(201).json({ success: true, data: wishlistItem })
  } catch (error) {
    next(error)
  }
}

const getWishlist = async (req, res, next) => {
  try {
    const wishlist = await wishlistService.getWishlist(req.user.userId)
    res.json({ success: true, data: wishlist })
  } catch (error) {
    next(error)
  }
}

export default {
  addToWishlist,
  getWishlist,
}
