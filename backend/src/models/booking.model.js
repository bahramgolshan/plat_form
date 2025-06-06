import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Booking = sequelize.define('booking', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed', 'refunded'),
      allowNull: false,
      defaultValue: 'pending'
    },
    bookingReference: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'booking_reference'
    },
    totalAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      field: 'total_amount'
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    adultCount: {
      type: DataTypes.INTEGER,
      field: 'adult_count'
    },
    childCount: {
      type: DataTypes.INTEGER,
      field: 'child_count'
    },
    infantCount: {
      type: DataTypes.INTEGER,
      field: 'infant_count'
    },
    specialRequests: {
      type: DataTypes.TEXT,
      field: 'special_requests'
    },
    cancellationReason: {
      type: DataTypes.TEXT,
      field: 'cancellation_reason'
    },
    cancellationFee: {
      type: DataTypes.DECIMAL(12, 2),
      field: 'cancellation_fee'
    },
    cancellationProcessedAt: {
      type: DataTypes.DATE,
      field: 'cancellation_processed_at'
    },
    startsAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'starts_at'
    },
    endsAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'ends_at'
    }
  }, {
    paranoid: true,
    underscored: true,
    timestamps: true,
    tableName: 'bookings'
  });

  Booking.associate = (models) => {
    Booking.belongsTo(models.User, {
      foreignKey: 'customer_id',
      as: 'customer'
    });
    Booking.belongsTo(models.Listing, {
      foreignKey: 'listing_id',
      as: 'listing'
    });
    Booking.hasMany(models.BookingParticipant, {
      foreignKey: 'booking_id',
      as: 'participants'
    });
    Booking.hasMany(models.BookingAvailabilitySlot, {
      foreignKey: 'booking_id',
      as: 'availabilitySlots'
    });
    Booking.hasMany(models.Payment, {
      foreignKey: 'booking_id',
      as: 'payments'
    });
    Booking.hasOne(models.Invoice, {
      foreignKey: 'booking_id',
      as: 'invoice'
    });
    Booking.hasOne(models.Review, {
      foreignKey: 'booking_id',
      as: 'review'
    });
  };

  return Booking;
};