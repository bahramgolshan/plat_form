import { DataTypes } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'

export async function up(queryInterface, Sequelize) {
  const [listings] = await queryInterface.sequelize.query('SELECT id FROM listings;')
  const [users] = await queryInterface.sequelize.query('SELECT id FROM users;')

  const bookings = [
    {
      id: uuidv4(),
      customer_id: users[0].id,
      listing_id: listings[0].id,
      status: 'confirmed',
      booking_reference: 'BOOK-2023-001',
      total_amount: 1200.5,
      currency: 'USD',
      adult_count: 2,
      child_count: 1,
      starts_at: new Date(Date.now() + 86400000 * 7), // 7 days from now
      ends_at: new Date(Date.now() + 86400000 * 14), // 14 days from now
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      customer_id: users[1].id,
      listing_id: listings[1].id,
      status: 'completed',
      booking_reference: 'BOOK-2023-002',
      total_amount: 850.0,
      currency: 'EUR',
      adult_count: 4,
      starts_at: new Date(Date.now() - 86400000 * 7), // 7 days ago
      ends_at: new Date(Date.now() - 86400000 * 3), // 3 days ago
      created_at: new Date(Date.now() - 86400000 * 14), // 14 days ago
      updated_at: new Date(Date.now() - 86400000 * 3), // 3 days ago
    },
    {
      id: uuidv4(),
      customer_id: users[2].id,
      listing_id: listings[2].id,
      status: 'pending',
      booking_reference: 'BOOK-2023-003',
      total_amount: 450.75,
      currency: 'GBP',
      adult_count: 1,
      child_count: 2,
      infant_count: 1,
      special_requests: 'Need baby cot and high chair',
      starts_at: new Date(Date.now() + 86400000 * 21), // 21 days from now
      ends_at: new Date(Date.now() + 86400000 * 28), // 28 days from now
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]

  await queryInterface.bulkInsert('bookings', bookings)
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('bookings', null, {})
}
