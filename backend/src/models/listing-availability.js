import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ListingAvailability = sequelize.define('ListingAvailability', {
    availability_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    available_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    booked_quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    tableName: 'ListingAvailabilities',
    timestamps: true,
    paranoid: false,
  });

  ListingAvailability.associate = (models) => {
    ListingAvailability.belongsTo(models.Listing, {
      foreignKey: 'listing_id',
      as: 'listing',
    });
  };

  return ListingAvailability;
};