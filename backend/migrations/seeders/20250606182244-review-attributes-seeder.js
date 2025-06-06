import { DataTypes } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'

export async function up(queryInterface, Sequelize) {
  const [reviews] = await queryInterface.sequelize.query('SELECT id FROM reviews;')
  const [categoryAttributes] = await queryInterface.sequelize.query('SELECT id FROM category_attributes;')

  const reviewAttributes = [
    {
      id: uuidv4(),
      review_id: reviews[0].id,
      attribute_id: categoryAttributes[0].id,
      rating: 5,
      created_at: new Date(Date.now() - 86400000 * 5),
    },
    {
      id: uuidv4(),
      review_id: reviews[1].id,
      attribute_id: categoryAttributes[1].id,
      rating: 4,
      created_at: new Date(Date.now() - 86400000 * 5),
    },
    {
      id: uuidv4(),
      review_id: reviews[2].id,
      attribute_id: categoryAttributes[2].id,
      rating: 4,
      created_at: new Date(Date.now() - 86400000 * 7),
    },
    {
      id: uuidv4(),
      review_id: reviews[1].id,
      attribute_id: categoryAttributes[3].id,
      rating: 3,
      created_at: new Date(Date.now() - 86400000 * 7),
    },
  ]

  await queryInterface.bulkInsert('review_attributes', reviewAttributes)
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('review_attributes', null, {})
}
