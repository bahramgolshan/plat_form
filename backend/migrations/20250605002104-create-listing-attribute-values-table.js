import { DataTypes } from 'sequelize'

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('listing_attribute_values', {
      value_id: {
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
      attribute_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'category_attributes',
          key: 'attribute_id',
        },
        onDelete: 'CASCADE',
      },
      attribute_value: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deleted_at: DataTypes.DATE,
    })

    await queryInterface.addIndex('listing_attribute_values', ['listing_id', 'attribute_id'], {
      unique: true,
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('listing_attribute_values')
  },
}
