import { DataTypes } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'

export async function up(queryInterface, Sequelize) {
  const [users] = await queryInterface.sequelize.query('SELECT id FROM users;')

  const paymentMethods = [
    {
      id: uuidv4(),
      user_id: users[0].id,
      type: 'credit_card',
      details: JSON.stringify({
        brand: 'visa',
        last4: '4242',
        exp_month: 12,
        exp_year: 2025,
        name: 'John Doe',
      }),
      is_default: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      user_id: users[1].id,
      type: 'paypal',
      details: JSON.stringify({
        email: 'customer@example.com',
        payer_id: 'PAYER123456',
      }),
      is_default: true,
      created_at: new Date(Date.now() - 86400000 * 30),
      updated_at: new Date(Date.now() - 86400000 * 30),
    },
    {
      id: uuidv4(),
      user_id: users[2].id,
      type: 'apple_pay',
      details: JSON.stringify({
        device: 'iPhone 13',
        network: 'Visa',
        transaction_id: 'APPLEPAY123456',
      }),
      is_default: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]

  await queryInterface.bulkInsert('payment_methods', paymentMethods)
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('payment_methods', null, {})
}
