'use strict'

const roles = [
  {
    key: 'customer',
    name: 'Customer',
    description: 'Can browse and purchase services',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    key: 'supplier',
    name: 'Supplier',
    description: 'Can create and manage listings',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    key: 'employee',
    name: 'Employee',
    created_at: new Date(),
    updated_at: new Date(),
  },
]

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('roles', roles, {
    ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
  })
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('roles', {
    key: roles.map((r) => r.key),
  })
}
