import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const PaymentMethod = sequelize.define('paymentMethod', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('credit_card', 'paypal', 'apple_pay', 'google_pay', 'bank_transfer'),
      allowNull: false
    },
    details: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_default'
    }
  }, {
    paranoid: true,
    underscored: true,
    timestamps: true,
    tableName: 'payment_methods'
  });

  PaymentMethod.associate = (models) => {
    PaymentMethod.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    PaymentMethod.hasMany(models.Payment, {
      foreignKey: 'payment_method_id',
      as: 'payments'
    });
  };

  return PaymentMethod;
};