import { BookingService } from '../services/booking.service.js'

const bookingService = new BookingService()

const getCustomerBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getCustomerBookings(req.user.userId)
    res.json({ success: true, data: bookings })
  } catch (error) {
    next(error)
  }
}

export default {
  getCustomerBookings,
}
