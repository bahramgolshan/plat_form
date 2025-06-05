import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ListingLocations', {
      listing_location_id: {
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
      location_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Locations',
          key: 'location_id',
        },
        onDelete: 'CASCADE',
      },
      stop_order: DataTypes.INTEGER,
      label: DataTypes.STRING(255),
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedAt: DataTypes.DATE,
    });

    await queryInterface.addIndex('ListingLocations', ['listing_id', 'location_id', 'stop_order'], {
      unique: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('ListingLocations');
  },
};