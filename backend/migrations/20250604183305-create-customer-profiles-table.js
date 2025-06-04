export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('customer_profiles', {
    user_id: {
      type: Sequelize.UUID,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    date_of_birth: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    preferred_language: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  })
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('customer_profiles')
}
