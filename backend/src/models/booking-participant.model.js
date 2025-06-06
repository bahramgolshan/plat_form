import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const BookingParticipant = sequelize.define('bookingParticipant', {
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
    },
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name'
    },
    age: {
      type: DataTypes.INTEGER
    }
  }, {
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    tableName: 'booking_participants'
  });

  BookingParticipant.associate = (models) => {
    BookingParticipant.belongsTo(models.Booking, {
      foreignKey: 'booking_id',
      as: 'booking'
    });
    BookingParticipant.belongsTo(models.PriceTier, {
      foreignKey: 'price_tier_id',
      as: 'priceTier'
    });
  };

  return BookingParticipant;
};