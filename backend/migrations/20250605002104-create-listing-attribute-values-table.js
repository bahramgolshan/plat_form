import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ListingAttributeValues', {
      value_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      listing_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Listings',
          key: 'listing_id',
        },
        onDelete: 'CASCADE',
      },
      attribute_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'CategoryAttributes',
          key: 'attribute_id',
        },
        onDelete: 'CASCADE',
      },
      attribute_value: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedAt: DataTypes.DATE,
    });

    await queryInterface.addIndex('ListingAttributeValues', ['listing_id', 'attribute_id'], {
      unique: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('ListingAttributeValues');
  },
};