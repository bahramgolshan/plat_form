export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('supplier_profiles', {
    user_id: {
      type: Sequelize.UUID,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    company_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    company_website: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    tax_id: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    address: {
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
  await queryInterface.dropTable('supplier_profiles')
}
