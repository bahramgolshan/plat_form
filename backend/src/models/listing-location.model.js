import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const ListingLocation = sequelize.define(
    'ListingLocation',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      listingId: {
        field: 'listing_id',
        type: DataTypes.UUID,
        allowNull: false,
      },
      locationId: {
        field: 'location_id',
        type: DataTypes.UUID,
        allowNull: false,
      },
      stopOrder: {
        field: 'stop_order',
        type: DataTypes.INTEGER,
      },
      label: DataTypes.STRING(255),
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
      tableName: 'listing_locations',
      paranoid: true,
      timestamps: false,
    }
  )

  ListingLocation.associate = (models) => {
    ListingLocation.belongsTo(models.Listing, {
      foreignKey: 'listing_id',
      as: 'listing',
    })
    ListingLocation.belongsTo(models.Location, {
      foreignKey: 'location_id',
      as: 'location',
    })
  }

  return ListingLocation
}
