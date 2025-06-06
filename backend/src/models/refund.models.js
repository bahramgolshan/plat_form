import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Refund = sequelize.define('refund', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
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
    processedAt: {
      type: DataTypes.DATE,
      field: 'processed_at'
    }
  }, {
    underscored: true,
    timestamps: true,
    tableName: 'refunds'
  });

  Refund.associate = (models) => {
    Refund.belongsTo(models.Payment, {
      foreignKey: 'payment_id',
      as: 'payment'
    });
    Refund.belongsTo(models.User, {
      foreignKey: 'processed_by',
      as: 'processedBy'
    });
  };

  return Refund;
};