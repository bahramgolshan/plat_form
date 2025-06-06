import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const ListingSchedule = sequelize.define(
    'ListingSchedule',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      dayOfWeek: {
        field: 'day_of_week',
        type: DataTypes.ENUM(
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
          'saturday',
          'sunday'
        ),
        allowNull: false,
      },
      startTime: {
        field: 'start_time',
        type: DataTypes.TIME,
        allowNull: false,
      },
      endTime: {
        field: 'end_time',
        type: DataTypes.TIME,
      },
      isRecurring: {
        field: 'is_recurring',
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
      tableName: 'listing_schedules',
      paranoid: true,
      timestamps: false,
    }
  )

  ListingSchedule.associate = (models) => {
    ListingSchedule.belongsTo(models.Listing, {
      foreignKey: 'listing_id',
      as: 'listing',
    })
  }

  return ListingSchedule
}
