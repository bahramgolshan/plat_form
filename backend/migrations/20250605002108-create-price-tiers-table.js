import { DataTypes } from 'sequelize'

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('price_tiers', {
      tier_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      listing_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'listings',
          key: 'listing_id',
        },
        onDelete: 'CASCADE',
      },
      label: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      min_age: DataTypes.INTEGER,
      max_age: DataTypes.INTEGER,
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      is_default: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      valid_from: DataTypes.DATE,
      valid_to: DataTypes.DATE,
      min_quantity: DataTypes.INTEGER,
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedAt: DataTypes.DATE,
    })

    await queryInterface.addIndex('price_tiers', ['listing_id'])
  },

  async down(queryInterface) {
    await queryInterface.dropTable('price_tiers')
  },
}
