import { DataTypes } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'

export async function up(queryInterface, Sequelize) {
  const [bookings] = await queryInterface.sequelize.query('SELECT id FROM bookings;')
  const [users] = await queryInterface.sequelize.query('SELECT id FROM users;')
  const [paymentMethods] = await queryInterface.sequelize.query('SELECT id FROM payment_methods;')

  const payments = [
    {
      id: uuidv4(),
      booking_id: bookings[0].id,
      customer_id: users[0].id,
      amount: 1200.5,
      currency: 'USD',
      payment_method_id: paymentMethods[0].id,
      status: 'completed',
      gateway_reference: 'PAY-123456789',
      gateway_response: JSON.stringify({ id: 'ch_123456789', status: 'succeeded' }),
      captured_at: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      booking_id: bookings[1].id,
      customer_id: users[1].id,
      amount: 850.0,
      currency: 'EUR',
      payment_method_id: paymentMethods[1].id,
      status: 'completed',
      gateway_reference: 'PAY-987654321',
      gateway_response: JSON.stringify({ id: 'ch_987654321', status: 'succeeded' }),
      captured_at: new Date(Date.now() - 86400000 * 7),
      created_at: new Date(Date.now() - 86400000 * 14),
      updated_at: new Date(Date.now() - 86400000 * 7),
    },
    {
      id: uuidv4(),
      booking_id: bookings[2].id,
      customer_id: users[0].id,
      amount: 450.75,
      currency: 'GBP',
      payment_method_id: paymentMethods[2].id,
      status: 'pending',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]

  await queryInterface.bulkInsert('payments', payments)
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('payments', null, {})
}
