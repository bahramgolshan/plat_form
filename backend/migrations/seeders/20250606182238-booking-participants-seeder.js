import { DataTypes } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'

export async function up(queryInterface, Sequelize) {
  const [bookings] = await queryInterface.sequelize.query('SELECT id FROM bookings;')
  const [priceTiers] = await queryInterface.sequelize.query('SELECT id FROM price_tiers;')

  const participants = [
    {
      id: uuidv4(),
      booking_id: bookings[0].id,
      price_tier_id: priceTiers[0].id,
      quantity: 2,
      first_name: 'John',
      last_name: 'Doe',
      age: 35,
      created_at: new Date(),
    },
    {
      id: uuidv4(),
      booking_id: bookings[1].id,
      price_tier_id: priceTiers[1].id,
      quantity: 1,
      first_name: 'Jane',
      last_name: 'Doe',
      age: 8,
      created_at: new Date(),
    },
    {
      id: uuidv4(),
      booking_id: bookings[2].id,
      price_tier_id: priceTiers[2].id,
      quantity: 4,
      first_name: 'Michael',
      last_name: 'Smith',
      age: 42,
      created_at: new Date(Date.now() - 86400000 * 14),
    },
  ]

  await queryInterface.bulkInsert('booking_participants', participants)
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('booking_participants', null, {})
}
