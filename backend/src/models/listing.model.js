import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Listing = sequelize.define(
    'Listing',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      supplierId: {
        field: 'supplier_id',
        type: DataTypes.UUID,
        allowNull: false,
      },
      verticalExtensionId: {
        field: 'vertical_extension_id',
        type: DataTypes.UUID,
      },
      verticalExtensionType: {
        field: 'vertical_extension_type',
        type: DataTypes.STRING(50),
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: DataTypes.TEXT,
      basePrice: {
        field: 'base_price',
        type: DataTypes.DECIMAL(10, 2),
      },
      currency: DataTypes.STRING(3),
      status: {
        type: DataTypes.ENUM('draft', 'published', 'archived'),
        allowNull: false,
      },
      instantBookable: {
        field: 'instant_bookable',
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      averageRating: {
        field: 'average_rating',
        type: DataTypes.DECIMAL(3, 2),
      },
      reviewCount: {
        field: 'review_count',
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
      tableName: 'listings',
      paranoid: true,
      timestamps: true,
    }
  )

  Listing.associate = (models) => {
    Listing.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    })
    Listing.hasMany(models.ListingAttribute, {
      foreignKey: 'listing_id',
      as: 'attributes',
    })
    Listing.hasMany(models.ListingImage, {
      foreignKey: 'listing_id',
      as: 'images',
    })
    Listing.belongsToMany(models.Location, {
      through: 'listing_locations',
      foreignKey: 'listing_id',
      as: 'locations',
    })
    Listing.hasMany(models.PriceTier, {
      foreignKey: 'listing_id',
      as: 'priceTiers',
    })
    Listing.hasMany(models.ListingSchedule, {
      foreignKey: 'listing_id',
      as: 'schedules',
    })
    Listing.hasMany(models.ListingAvailability, {
      foreignKey: 'listing_id',
      as: 'availability',
    })
    Listing.hasMany(models.ListingTranslation, {
      foreignKey: 'listing_id',
      as: 'translations',
    })
    Listing.belongsToMany(models.Tag, {
      through: 'ListingTags',
      foreignKey: 'listing_id',
      as: 'tags',
    })
  }

  return Listing
}
