import { db } from '../models/index.js'
import { Op } from 'sequelize'

const { Location } = db

export class LocationService {
  async searchLocations(query, limit = 5) {
    return await Location.findAll({
      where: {
        name: { [Op.iLike]: `%${query}%` },
        deletedAt: null,
      },
      limit,
    })
  }
}
