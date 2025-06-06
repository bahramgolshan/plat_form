import { DataTypes } from 'sequelize';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('refunds', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    payment_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'payments',
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
    reason: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.ENUM('requested', 'processing', 'completed', 'rejected'),
      allowNull: false,
      defaultValue: 'requested'
    },
    processed_by: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'SET NULL'
    },
    processed_at: {
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

  await queryInterface.addIndex('refunds', ['payment_id']);
  await queryInterface.addIndex('refunds', ['processed_by']);
  await queryInterface.addIndex('refunds', ['status']);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('refunds');
}