import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ListingAttributeValue = sequelize.define('ListingAttributeValue', {
    value_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    attribute_value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'ListingAttributeValues',
    paranoid: true,
    timestamps: false,
    createdAt: true,
    updatedAt: false,
  });

  ListingAttributeValue.associate = (models) => {
    ListingAttributeValue.belongsTo(models.Listing, {
      foreignKey: 'listing_id',
      as: 'listing',
    });
    ListingAttributeValue.belongsTo(models.CategoryAttribute, {
      foreignKey: 'attribute_id',
      as: 'attribute',
    });
  };

  return ListingAttributeValue;
};