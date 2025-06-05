import { v4 as uuidv4 } from 'uuid'

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tags',
      [
        { id: uuidv4(), name: 'Adventure', created_at: new Date() },
        { id: uuidv4(), name: 'Family-friendly', created_at: new Date() },
        { id: uuidv4(), name: 'Romantic', created_at: new Date() },
        { id: uuidv4(), name: 'Budget', created_at: new Date() },
        { id: uuidv4(), name: 'Luxury', created_at: new Date() },
        { id: uuidv4(), name: 'Historical', created_at: new Date() },
        { id: uuidv4(), name: 'Nature', created_at: new Date() },
        { id: uuidv4(), name: 'Food & Drink', created_at: new Date() },
      ],
      {
        ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tags', null, {})
  },
}
