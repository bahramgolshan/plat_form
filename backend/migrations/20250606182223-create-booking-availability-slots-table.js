import { DataTypes } from 'sequelize';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('booking_availability_slots', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    booking_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'bookings',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    availability_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'listing_availabilities',
        key: 'id'
      },
      onDelete: 'RESTRICT'
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  await queryInterface.addIndex('booking_availability_slots', ['booking_id']);
  await queryInterface.addIndex('booking_availability_slots', ['availability_id']);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('booking_availability_slots');
}