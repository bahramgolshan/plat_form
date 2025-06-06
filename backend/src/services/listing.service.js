import { db } from '../models/index.js'
import { Op } from 'sequelize'

const { Listing, ListingAvailability, Category, Location, ListingLocation, PriceTier } = db

export class ListingService {
  async getListings({
    category,
    location,
    priceMin,
    priceMax,
    date,
    participants,
    limit = 10,
    offset = 0,
  }) {
    console.log("here \n")
    const where = { status: 'published' }
    const include = []

    if (category) {
      include.push({
        model: Category,
        where: { id: category },
      })
    }

    if (location) {
      include.push({
        model: Location,
        through: { where: { id: location } },
        required: true,
      })
    }

    if (priceMin || priceMax) {
      include.push({
        model: PriceTier,
        where: {
          amount: {
            [Op.between]: [priceMin || 0, priceMax || 999999],
          },
        },
      })
    }

    if (date) {
      include.push({
        model: ListingAvailability,
        where: {
          date: new Date(date),
          availableQuantity: { [Op.gt]: 0 },
        },
      })
    }

    if (participants) {
      where.minParticipants = { [Op.lte]: participants }
      where.maxParticipants = { [Op.gte]: participants }
    }

    const { count, rows } = await Listing.findAndCountAll({
      where,
      include,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    })

    return {
      data: rows,
      meta: {
        pagination: { limit, offset, total: count },
      },
    }
  }

  async getListingDetails(id) {
    return await Listing.findByPk(id, {
      include: [
        { model: Category, as: 'category' },
        { model: Location, through: { attributes: ['stop_order', 'label'] }, as: 'locations'  },
        { model: PriceTier, as: 'priceTiers' },
        { model: ListingAvailability , as: 'availability'},
      ],
    })
  }

  async checkAvailability(id, date) {
    return await ListingAvailability.findAll({
      where: {
        listingId: id,
        date: new Date(date),
        availableQuantity: { [Op.gt]: 0 },
      },
    })
  }

  async getFeaturedListings() {
    return await Listing.findAll({
      where: { status: 'published' },
      order: [['average_rating', 'DESC']],
      limit: 10,
    })
  }
}
