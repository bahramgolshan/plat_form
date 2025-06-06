import { db } from '../models/index.js'

const { Category } = db

export class CategoryService {
  async getActiveCategories() {
    return await Category.findAll({
      where: { is_active: true },
      order: [['name', 'ASC']],
    })
  }
}
