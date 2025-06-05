import { DataTypes } from 'sequelize'

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('locations', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      parent_id: {
        type: DataTypes.UUID,
        references: {
          model: 'locations',
          key: 'id',
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
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deleted_at: DataTypes.DATE,
    })

    await queryInterface.addIndex('locations', ['parent_id'])
    await queryInterface.addIndex('locations', ['latitude', 'longitude'])
  },

  async down(queryInterface) {
    await queryInterface.dropTable('locations')
  },
}
