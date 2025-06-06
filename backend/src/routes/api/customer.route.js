import express from 'express';
import { 
  ensureCustomer, 
  checkIdempotency 
} from '../middlewares/auth.middleware.js';
import { 
  WishlistController, 
  ReviewController,
  BookingController
} from '../controllers/index.js';

const router = express.Router();
const wishlistController = new WishlistController();
const reviewController = new ReviewController();
const bookingController = new BookingController();

// Wishlists
router.post('/wishlists', ensureCustomer, checkIdempotency, wishlistController.addToWishlist);
router.get('/wishlists', ensureCustomer, wishlistController.getWishlist);

// Reviews
router.post('/reviews/:id', ensureCustomer, checkIdempotency, reviewController.createReview);

// Bookings
router.get('/bookings', ensureCustomer, bookingController.getCustomerBookings);

export default router;