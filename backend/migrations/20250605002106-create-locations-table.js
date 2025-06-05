import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Locations', {
      location_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      parent_location_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Locations',
          key: 'location_id',
        },
        onDelete: 'SET NULL',
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('continent', 'country', 'region', 'city', 'district', 'poi'),
        allowNull: false,
      },
      latitude: DataTypes.DECIMAL(10, 7),
      longitude: DataTypes.DECIMAL(10, 7),
      timezone: DataTypes.STRING(50),
      google_place_id: DataTypes.STRING(255),
      address_json: DataTypes.JSONB,
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedAt: DataTypes.DATE,
    });

    await queryInterface.addIndex('Locations', ['parent_location_id']);
    await queryInterface.addIndex('Locations', ['latitude', 'longitude']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Locations');
  },
};