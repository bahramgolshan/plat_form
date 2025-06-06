// seeders/refunds-seeder.js
import { DataTypes } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'

export async function up(queryInterface, Sequelize) {
  const [payments] = await queryInterface.sequelize.query('SELECT id FROM payments;')
  const [users] = await queryInterface.sequelize.query('SELECT id FROM users;')

  const refunds = [
    {
      id: uuidv4(),
      payment_id: payments[0].id,
      amount: 425.0,
      currency: 'EUR',
      reason: 'Customer cancelled booking',
      status: 'completed',
      processed_by: users[0].id, // admin user
      processed_at: new Date(Date.now() - 86400000 * 5),
      created_at: new Date(Date.now() - 86400000 * 7),
      updated_at: new Date(Date.now() - 86400000 * 5),
    },
    {
      id: uuidv4(),
      payment_id: payments[1].id,
      amount: 600.25,
      currency: 'USD',
      reason: 'Partial refund due to service issues',
      status: 'processing',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]

  await queryInterface.bulkInsert('refunds', refunds)
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('refunds', null, {})
}
