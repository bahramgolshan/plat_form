import { db } from '../models/index.js'
import { Op } from 'sequelize'

const { Listing } = db

export class SearchService {
  async fullTextSearch(query, limit = 10, offset = 0) {
    const { count, rows } = await Listing.findAndCountAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } },
        ],
        status: 'published',
      },
      limit,
      offset,
    })

    return {
      data: rows,
      meta: { pagination: { limit, offset, total: count } },
    }
  }

  async getSearchSuggestions(query, limit = 5) {
    return await Listing.findAll({
      attributes: ['title'],
      where: {
        title: { [Op.iLike]: `%${query}%` },
        status: 'published',
      },
      limit,
    })
  }
}
