export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'roles',
      [
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
      ],
      {
        ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {})
  },
}
