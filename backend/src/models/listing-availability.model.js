import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const ListingAvailability = sequelize.define(
    'ListingAvailability',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      listingId: {
        field: 'listing_id',
        type: DataTypes.UUID,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      startTime: {
        field: 'start_time',
        type: DataTypes.TIME,
      },
      endTime: {
        field: 'end_time',
        type: DataTypes.TIME,
      },
      availableQuantity: {
        field: 'available_quantity',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookedQuantity: {
        field: 'booked_quantity',
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
    },
    {
      tableName: 'listing_availabilities',
      timestamps: true,
      paranoid: false,
    }
  )

  ListingAvailability.associate = (models) => {
    ListingAvailability.belongsTo(models.Listing, {
      foreignKey: 'listing_id',
      as: 'listing',
    })
  }

  return ListingAvailability
}
