import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const PriceTier = sequelize.define('PriceTier', {
    tier_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    min_age: DataTypes.INTEGER,
    max_age: DataTypes.INTEGER,
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    valid_from: DataTypes.DATE,
    valid_to: DataTypes.DATE,
    min_quantity: DataTypes.INTEGER,
  }, {
    tableName: 'PriceTiers',
    paranoid: true,
    timestamps: false,
    createdAt: true,
    updatedAt: false,
  });

  PriceTier.associate = (models) => {
    PriceTier.belongsTo(models.Listing, {
      foreignKey: 'listing_id',
      as: 'listing',
    });
  };

  return PriceTier;
};