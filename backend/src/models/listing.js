import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Listing = sequelize.define('Listing', {
    listing_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    supplier_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    vertical_extension_id: DataTypes.UUID,
    vertical_extension_type: DataTypes.STRING(50),
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: DataTypes.TEXT,
    base_price: DataTypes.DECIMAL(10, 2),
    currency: DataTypes.STRING(3),
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived'),
      allowNull: false,
    },
    instant_bookable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    average_rating: DataTypes.DECIMAL(3, 2),
    review_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    tableName: 'Listings',
    paranoid: true,
    timestamps: true,
  });

  Listing.associate = (models) => {
    Listing.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    });
    Listing.hasMany(models.ListingAttributeValue, {
      foreignKey: 'listing_id',
      as: 'attributeValues',
    });
    Listing.hasMany(models.ListingImage, {
      foreignKey: 'listing_id',
      as: 'images',
    });
    Listing.belongsToMany(models.Location, {
      through: 'ListingLocations',
      foreignKey: 'listing_id',
      as: 'locations',
    });
    Listing.hasMany(models.PriceTier, {
      foreignKey: 'listing_id',
      as: 'priceTiers',
    });
    Listing.hasMany(models.ListingSchedule, {
      foreignKey: 'listing_id',
      as: 'schedules',
    });
    Listing.hasMany(models.ListingAvailability, {
      foreignKey: 'listing_id',
      as: 'availability',
    });
    Listing.hasMany(models.ListingTranslation, {
      foreignKey: 'listing_id',
      as: 'translations',
    });
    Listing.belongsToMany(models.Tag, {
      through: 'ListingTags',
      foreignKey: 'listing_id',
      as: 'tags',
    });
  };

  return Listing;
};