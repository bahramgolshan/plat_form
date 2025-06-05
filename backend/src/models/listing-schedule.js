import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ListingSchedule = sequelize.define('ListingSchedule', {
    schedule_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    day_of_week: {
      type: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: DataTypes.TIME,
    is_recurring: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: 'ListingSchedules',
    paranoid: true,
    timestamps: false,
    createdAt: true,
    updatedAt: false,
  });

  ListingSchedule.associate = (models) => {
    ListingSchedule.belongsTo(models.Listing, {
      foreignKey: 'listing_id',
      as: 'listing',
    });
  };

  return ListingSchedule;
};