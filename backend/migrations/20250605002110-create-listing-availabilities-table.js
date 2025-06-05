import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ListingAvailabilities', {
      availability_id: {
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
    });

    await queryInterface.addIndex('ListingAvailabilities', ['listing_id', 'date', 'start_time'], {
      unique: true,
    });
    await queryInterface.addIndex('ListingAvailabilities', ['date']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('ListingAvailabilities');
  },
};