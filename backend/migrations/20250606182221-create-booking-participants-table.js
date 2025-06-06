import { DataTypes } from 'sequelize';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('booking_participants', {
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
    price_tier_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'price_tiers',
        key: 'id'
      },
      onDelete: 'RESTRICT'
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.INTEGER
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  await queryInterface.addIndex('booking_participants', ['booking_id']);
  await queryInterface.addIndex('booking_participants', ['price_tier_id']);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('booking_participants');
}