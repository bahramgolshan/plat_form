import { DataTypes } from 'sequelize';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('bookings', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    customer_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    listing_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'listings',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed', 'refunded'),
      allowNull: false,
      defaultValue: 'pending'
    },
    booking_reference: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    total_amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    adult_count: {
      type: DataTypes.INTEGER
    },
    child_count: {
      type: DataTypes.INTEGER
    },
    infant_count: {
      type: DataTypes.INTEGER
    },
    special_requests: {
      type: DataTypes.TEXT
    },
    cancellation_reason: {
      type: DataTypes.TEXT
    },
    cancellation_fee: {
      type: DataTypes.DECIMAL(12, 2)
    },
    cancellation_processed_at: {
      type: DataTypes.DATE
    },
    starts_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ends_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    deleted_at: {
      type: DataTypes.DATE
    }
  });

  await queryInterface.addIndex('bookings', ['customer_id']);
  await queryInterface.addIndex('bookings', ['listing_id']);
  await queryInterface.addIndex('bookings', ['status']);
  await queryInterface.addIndex('bookings', ['starts_at', 'ends_at']);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('bookings');
}