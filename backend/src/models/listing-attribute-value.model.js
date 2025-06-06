import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const ListingAttributeValue = sequelize.define(
    'ListingAttributeValue',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
      },
      deletedAt: {
        field: 'deleted_at',
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'listing_attribute_values',
      paranoid: true,
      timestamps: false,
    }
  )

  ListingAttributeValue.associate = (models) => {
    ListingAttributeValue.belongsTo(models.Listing, {
      foreignKey: 'listing_id',
      as: 'listing',
    })
    ListingAttributeValue.belongsTo(models.CategoryAttribute, {
      foreignKey: 'category_attribute_id',
      as: 'attribute',
    })
  }

  return ListingAttributeValue
}
