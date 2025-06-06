import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Payment = sequelize.define('payment', {
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
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
      allowNull: false,
      defaultValue: 'pending'
    },
    gatewayReference: {
      type: DataTypes.STRING,
      field: 'gateway_reference'
    },
    gatewayResponse: {
      type: DataTypes.JSONB,
      field: 'gateway_response'
    },
    capturedAt: {
      type: DataTypes.DATE,
      field: 'captured_at'
    }
  }, {
    underscored: true,
    timestamps: true,
    tableName: 'payments'
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.Booking, {
      foreignKey: 'booking_id',
      as: 'booking'
    });
    Payment.belongsTo(models.User, {
      foreignKey: 'customer_id',
      as: 'customer'
    });
    Payment.belongsTo(models.PaymentMethod, {
      foreignKey: 'payment_method_id',
      as: 'paymentMethod'
    });
    Payment.hasOne(models.Refund, {
      foreignKey: 'payment_id',
      as: 'refund'
    });
  };

  return Payment;
};