import { db } from '../models/index.js'
import { Op } from 'sequelize'

const { Location, bookings, Listing_locations } = db

const getLocationById = async (id) => {
  return await locations.findOne({
    where: { id, deleted_at: null },
    include: [
      {
        association: 'parent',
        attributes: ['id', 'name', 'type'],
      },
    ],
  })
}

const getPopularLocations = async (limit) => {
  return await locations.findAll({
    attributes: [
      'locations.id',
      'locations.name',
      'locations.type',
      'locations.latitude',
      'locations.longitude',
      [Sequelize.fn('COUNT', Sequelize.col('bookings.id')), 'booking_count'],
    ],
    include: [
      {
        model: listing_locations,
        as: 'listing_locations',
        attributes: [],
        required: true,
      },
      {
        model: bookings,
        as: 'bookings',
        attributes: [],
        through: {
          attributes: [],
        },
        required: true,
      },
    ],
    group: ['locations.id'],
    order: [[Sequelize.literal('booking_count'), 'DESC']],
    limit,
    subQuery: false,
  })
}

const searchLocations = async (query, limit = 5) => {
  return await Location.findAll({
    where: {
      name: { [Op.iLike]: `%${query}%` },
      deletedAt: null,
    },
    limit,
  })
}

export const locationService = {
  getLocationById,
  getPopularLocations,
  searchLocations,
}
