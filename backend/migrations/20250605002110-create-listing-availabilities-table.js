import { DataTypes } from 'sequelize'

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('listing_availabilities', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      listing_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'listings',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      start_time: DataTypes.TIME,
      end_time: DataTypes.TIME,
      available_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      booked_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
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
    })

    await queryInterface.addIndex('listing_availabilities', ['listing_id', 'date', 'start_time'], {
      unique: true,
    })
    await queryInterface.addIndex('listing_availabilities', ['date'])
  },

  async down(queryInterface) {
    await queryInterface.dropTable('listing_availabilities')
  },
}
