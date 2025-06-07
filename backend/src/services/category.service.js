import { db } from '../models/index.js'

const { Category } = db

const getActiveCategories = async () => {
  return await Category.findAll({
    where: { is_active: true },
    order: [['name', 'ASC']],
  })
}

const getCategoryWithAttributes = async (id) => {
  return await categories.findOne({
    where: { id, is_active: true, deleted_at: null },
    include: [
      {
        model: category_attributes,
        as: 'attributes',
        where: { deleted_at: null },
        required: false,
      },
    ],
  })
}

export default {
  getActiveCategories,
  getCategoryWithAttributes,
}
