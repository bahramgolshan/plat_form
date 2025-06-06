import { DataTypes } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'

export async function up(queryInterface, Sequelize) {
  const user = [
    {
      id: uuidv4(),
      first_name: 'user1',
      last_name: 'doe',
      email: `user1@doe.com`,
      created_at: new Date(Date.now() - 86400000 * 14),
      updated_at: new Date(Date.now() - 86400000 * 3),
    },
    {
      id: uuidv4(),
      first_name: 'user2',
      last_name: 'doe',
      email: `user2@doe.com`,
      created_at: new Date(Date.now() - 86400000 * 14),
      updated_at: new Date(Date.now() - 86400000 * 3),
    },
    {
      id: uuidv4(),
      first_name: 'user3',
      last_name: 'doe',
      email: `user3@doe.com`,
      created_at: new Date(Date.now() - 86400000 * 14),
      updated_at: new Date(Date.now() - 86400000 * 3),
    },
    {
      id: uuidv4(),
      first_name: 'user4',
      last_name: 'doe',
      email: `user4@doe.com`,
      created_at: new Date(Date.now() - 86400000 * 14),
      updated_at: new Date(Date.now() - 86400000 * 3),
    },
  ]

  await queryInterface.bulkInsert('users', user)
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('users', null, {})
}
