import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ListingLocation = sequelize.define('ListingLocation', {
    listing_location_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    stop_order: DataTypes.INTEGER,
    label: DataTypes.STRING(255),
  }, {
    tableName: 'ListingLocations',
    paranoid: true,
    timestamps: false,
    createdAt: true,
    updatedAt: false,
  });

  ListingLocation.associate = (models) => {
    ListingLocation.belongsTo(models.Listing, {
      foreignKey: 'listing_id',
      as: 'listing',
    });
    ListingLocation.belongsTo(models.Location, {
      foreignKey: 'location_id',
      as: 'location',
    });
  };

  return ListingLocation;
};