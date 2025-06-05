import { v4 as uuidv4 } from 'uuid'

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          category_id: uuidv4(),
          parent_category_id: null,
          name: 'Tours',
          slug: 'tours',
          description: 'Guided tours and experiences',
          icon: 'tour',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: uuidv4(),
          parent_category_id: null,
          name: 'Activities',
          slug: 'activities',
          description: 'Outdoor and indoor activities',
          icon: 'activity',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: uuidv4(),
          parent_category_id: null,
          name: 'Transportation',
          slug: 'transportation',
          description: 'Vehicle rentals and transfers',
          icon: 'car',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {
        ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {})
  },
}
