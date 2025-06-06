import { DataTypes } from 'sequelize';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('payments', {
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
    customer_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    payment_method_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'payment_methods',
        key: 'id'
      },
      onDelete: 'RESTRICT'
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
      allowNull: false,
      defaultValue: 'pending'
    },
    gateway_reference: {
      type: DataTypes.STRING
    },
    gateway_response: {
      type: DataTypes.JSONB
    },
    captured_at: {
      type: DataTypes.DATE
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
    }
  });

  await queryInterface.addIndex('payments', ['booking_id']);
  await queryInterface.addIndex('payments', ['customer_id']);
  await queryInterface.addIndex('payments', ['payment_method_id']);
  await queryInterface.addIndex('payments', ['status']);
  await queryInterface.addIndex('payments', ['gateway_reference'], {
    unique: true,
    where: {
      gateway_reference: {
        [Sequelize.Op.ne]: null
      }
    }
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('payments');
}