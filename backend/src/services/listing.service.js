import { db } from '../models/index.js'
import { Op } from 'sequelize'
import { getDistance } from 'geolib'

const { Listing, ListingAvailability, Category, Location, ListingLocation, PriceTier } = db

const getListings = async ({
  category,
  location,
  priceMin,
  priceMax,
  date,
  participants,
  limit = 10,
  offset = 0,
}) => {
  console.log('here \n')
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

const getListingDetails = async (id) => {
  return await Listing.findByPk(id, {
    include: [
      { model: Category, as: 'category' },
      { model: Location, through: { attributes: ['stop_order', 'label'] }, as: 'locations' },
      { model: PriceTier, as: 'priceTiers' },
      { model: ListingAvailability, as: 'availability' },
    ],
  })
}

const checkAvailability = async (id, date) => {
  return await ListingAvailability.findAll({
    where: {
      listingId: id,
      date: new Date(date),
      availableQuantity: { [Op.gt]: 0 },
    },
  })
}

const getFeaturedListings = async () => {
  return await Listing.findAll({
    where: { status: 'published' },
    order: [['average_rating', 'DESC']],
    limit: 10,
  })
}

const searchListings = async ({ keyword, category, minPrice, maxPrice, limit, offset }) => {
  const where = {
    status: 'published',
    deleted_at: null,
  }

  if (keyword) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${keyword}%` } },
      { description: { [Op.iLike]: `%${keyword}%` } },
      { '$tags.name$': { [Op.iLike]: `%${keyword}%` } },
    ]
  }

  if (category) {
    where.category_id = category
  }

  if (minPrice || maxPrice) {
    where.base_price = {}
    if (minPrice) where.base_price[Op.gte] = minPrice
    if (maxPrice) where.base_price[Op.lte] = maxPrice
  }

  const results = await listings.findAndCountAll({
    where,
    include: [
      {
        model: listing_tags,
        as: 'listing_tags',
        include: [
          {
            model: tags,
            as: 'tag',
          },
        ],
      },
      {
        model: categories,
        as: 'category',
      },
    ],
    limit,
    offset,
    order: [['created_at', 'DESC']],
    distinct: true,
  })

  return {
    count: results.count,
    rows: results.rows,
  }
}

const getNearbyListings = async ({ latitude, longitude, radius, limit, offset }) => {
  // First get all locations within the radius
  const locationsWithinRadius = await locations.findAll({
    where: {
      latitude: { [Op.ne]: null },
      longitude: { [Op.ne]: null },
      deleted_at: null,
    },
    attributes: ['id', 'name', 'latitude', 'longitude'],
  })

  // Filter locations by distance
  const nearbyLocations = locationsWithinRadius.filter((loc) => {
    const distance = getDistance(
      { latitude, longitude },
      { latitude: loc.latitude, longitude: loc.longitude }
    )
    return distance <= radius * 1000 // Convert km to meters
  })

  const locationIds = nearbyLocations.map((loc) => loc.id)

  // Get listings associated with these locations
  const results = await listings.findAndCountAll({
    where: {
      status: 'published',
      deleted_at: null,
      '$listing_locations.location_id$': { [Op.in]: locationIds },
    },
    include: [
      {
        association: 'listing_locations',
        include: [
          {
            model: locations,
            as: 'location',
          },
        ],
      },
    ],
    limit,
    offset,
    order: [['created_at', 'DESC']],
    distinct: true,
  })

  return {
    count: results.count,
    rows: results.rows,
  }
}

const getListingImages = async (listingId) => {
  return await listing_images.findAll({
    where: {
      listing_id: listingId,
      deleted_at: null,
    },
    order: [['sort_order', 'ASC']],
    attributes: ['id', 'image_url', 'caption', 'is_primary'],
  })
}

export default {
  getListings,
  getListingDetails,
  checkAvailability,
  getFeaturedListings,
  searchListings,
  getNearbyListings,
  getListingImages,
}
