import { Booking } from '../models/index.js';

export class BookingService {
  async getCustomerBookings(customerId) {
    return await Booking.findAll({
      where: { customerId: customerId },
      include: [{ model: Listing, as: 'listing' }],
      order: [['createdAt', 'DESC']]
    });
  }
}