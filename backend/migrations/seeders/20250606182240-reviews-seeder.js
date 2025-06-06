import { DataTypes, UUIDV4 } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'

export async function up(queryInterface, Sequelize) {
  const [bookings] = await queryInterface.sequelize.query('SELECT id FROM bookings;')
  const [listings] = await queryInterface.sequelize.query('SELECT id FROM listings;')
  const [users] = await queryInterface.sequelize.query('SELECT id FROM users;')

  const reviews = [
    {
      id: uuidv4(),
      booking_id: bookings[0].id,
      listing_id: listings[0].id,
      reviewer_id: users[0].id,
      rating: 5,
      title: 'Amazing experience!',
      comment: 'We had a wonderful time. The place was even better than described.',
      is_verified: true,
      status: 'published',
      created_at: new Date(Date.now() - 86400000 * 5),
      updated_at: new Date(Date.now() - 86400000 * 5),
    },
    {
      id: uuidv4(),
      booking_id: bookings[1].id,
      listing_id: listings[1].id,
      reviewer_id: users[1].id,
      rating: 4,
      title: 'Great location',
      comment: 'The location was perfect, but the wifi was a bit slow.',
      is_verified: true,
      status: 'published',
      response_text: "Thank you for your feedback! We've upgraded our wifi since your stay.",
      response_date: new Date(Date.now() - 86400000 * 2),
      created_at: new Date(Date.now() - 86400000 * 7),
      updated_at: new Date(Date.now() - 86400000 * 2),
    },
    {
      id: uuidv4(),
      booking_id: bookings[2].id,
      listing_id: listings[2].id,
      reviewer_id: users[2].id,
      rating: 3,
      comment: 'It was okay, but could use some improvements.',
      is_verified: true,
      status: 'pending',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]

  await queryInterface.bulkInsert('reviews', reviews)
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('reviews', null, {})
}
