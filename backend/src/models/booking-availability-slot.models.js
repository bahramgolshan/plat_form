import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const BookingAvailabilitySlot = sequelize.define('bookingAvailabilitySlot', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    tableName: 'booking_availability_slots'
  });

  BookingAvailabilitySlot.associate = (models) => {
    BookingAvailabilitySlot.belongsTo(models.Booking, {
      foreignKey: 'booking_id',
      as: 'booking'
    });
    BookingAvailabilitySlot.belongsTo(models.ListingAvailability, {
      foreignKey: 'availability_id',
      as: 'availability'
    });
  };

  return BookingAvailabilitySlot;
};