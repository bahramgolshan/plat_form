import { DataTypes } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'

export async function up(queryInterface, Sequelize) {
  const [bookings] = await queryInterface.sequelize.query('SELECT id FROM bookings;')

  const [availabilities] = await queryInterface.sequelize.query(
    'SELECT id FROM listing_availabilities;'
  )

  const slots = [
    {
      id: uuidv4(),
      booking_id: bookings[0].id,
      availability_id: availabilities[0].id,
      quantity: 1,
      created_at: new Date(),
    },
    {
      id: uuidv4(),
      booking_id: bookings[1].id,
      availability_id: availabilities[1].id,
      quantity: 2,
      created_at: new Date(Date.now() - 86400000 * 14),
    },
    {
      id: uuidv4(),
      booking_id: bookings[2].id,
      availability_id: availabilities[2].id,
      quantity: 1,
      created_at: new Date(),
    },
  ]

  await queryInterface.bulkInsert('booking_availability_slots', slots)
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('booking_availability_slots', null, {})
}
