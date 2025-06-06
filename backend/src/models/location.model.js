import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Location = sequelize.define(
    'Location',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('continent', 'country', 'region', 'city', 'district', 'poi'),
        allowNull: false,
      },
      latitude: DataTypes.DECIMAL(10, 7),
      longitude: DataTypes.DECIMAL(10, 7),
      timezone: DataTypes.STRING(50),
      googlePlaceId: {
        field: 'google_place_id',
        type: DataTypes.STRING(255),
      },
      addressJson: {
        field: 'address_json',
        type: DataTypes.JSONB,
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
      tableName: 'locations',
      paranoid: true,
      timestamps: true,
    }
  )

  Location.associate = (models) => {
    Location.belongsTo(models.Location, {
      foreignKey: 'parent_id',
      as: 'parent',
    })
    Location.hasMany(models.Location, {
      foreignKey: 'parent_id',
      as: 'children',
    })
    Location.belongsToMany(models.Listing, {
      through: 'listing_locations',
      foreignKey: 'location_id',
      as: 'listings',
    })
  }

  return Location
}
