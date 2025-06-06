import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const PriceTier = sequelize.define(
    'PriceTier',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      label: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      minAge: {
        field: 'min_age',
        type: DataTypes.INTEGER,
      },
      maxAge: {
        field: 'max_age',
        type: DataTypes.INTEGER,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      isDefault: {
        field: 'is_default',
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      validFrom: {
        field: 'valid_from',
        type: DataTypes.DATE,
      },
      validTo: {
        field: 'valid_to',
        type: DataTypes.DATE,
      },
      minQuantity: {
        field: 'min_quantity',
        type: DataTypes.INTEGER,
      },
      createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
      },
      deletedAt: {
        field: 'deleted_at',
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'price_tiers',
      paranoid: true,
      timestamps: false,
    }
  )

  PriceTier.associate = (models) => {
    PriceTier.belongsTo(models.Listing, {
      foreignKey: 'listing_id',
      as: 'listing',
    })
  }

  return PriceTier
}
