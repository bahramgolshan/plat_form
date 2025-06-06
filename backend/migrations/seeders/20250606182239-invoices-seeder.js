import { DataTypes } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'

export async function up(queryInterface, Sequelize) {
  const [bookings] = await queryInterface.sequelize.query('SELECT id FROM bookings;')
  
  const invoices = [
    {
      id: uuidv4(),
      booking_id: bookings[0].id,
      invoice_number: 'INV-2023-001',
      issue_date: new Date(),
      due_date: new Date(Date.now() + 86400000 * 14), // 14 days from now
      status: 'issued',
      tax_amount: 200.1,
      subtotal: 1000.4,
      total: 1200.5,
      currency: 'USD',
      pdf_url: 'https://example.com/invoices/INV-2023-001.pdf',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      booking_id: bookings[1].id,
      invoice_number: 'INV-2023-002',
      issue_date: new Date(Date.now() - 86400000 * 21), // 21 days ago
      due_date: new Date(Date.now() - 86400000 * 7), // 7 days ago
      status: 'paid',
      tax_amount: 141.67,
      subtotal: 708.33,
      total: 850.0,
      currency: 'EUR',
      pdf_url: 'https://example.com/invoices/INV-2023-002.pdf',
      created_at: new Date(Date.now() - 86400000 * 21),
      updated_at: new Date(Date.now() - 86400000 * 7),
    },
    {
      id: uuidv4(),
      booking_id: bookings[2].id,
      invoice_number: 'INV-2023-003',
      issue_date: new Date(),
      due_date: new Date(Date.now() + 86400000 * 14), // 14 days from now
      status: 'draft',
      subtotal: 450.75,
      total: 450.75,
      currency: 'GBP',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]

  await queryInterface.bulkInsert('invoices', invoices)
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('invoices', null, {})
}
