import { DataTypes } from 'sequelize';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('payment_methods', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    type: {
      type: DataTypes.ENUM('credit_card', 'paypal', 'apple_pay', 'google_pay', 'bank_transfer'),
      allowNull: false
    },
    details: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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

  await queryInterface.addIndex('payment_methods', ['user_id']);
  await queryInterface.addIndex('payment_methods', ['type']);
  await queryInterface.addIndex('payment_methods', ['is_default']);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('payment_methods');
}