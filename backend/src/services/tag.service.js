import { db } from '../models/index.js'
import { Sequelize } from 'sequelize'

const { tags, listing_tags } = db

const getAllTags = async ({ limit, offset }) => {
  return await tags.findAndCountAll({
    where: { deleted_at: null },
    limit,
    offset,
    order: [['name', 'ASC']],
  })
}

const getPopularTags = async (limit) => {
  return await tags.findAll({
    attributes: [
      'id',
      'name',
      [Sequelize.fn('COUNT', Sequelize.col('listing_tags.listing_id')), 'usage_count'],
    ],
    include: [
      {
        model: listing_tags,
        as: 'listing_tags',
        attributes: [],
        required: true,
      },
    ],
    group: ['tags.id'],
    order: [[Sequelize.literal('usage_count'), 'DESC']],
    limit,
    subQuery: false,
  })
}

export const tagService = {
  getAllTags,
  getPopularTags,
}
