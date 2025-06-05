import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Location = sequelize.define('Location', {
    location_id: {
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
    google_place_id: DataTypes.STRING(255),
    address_json: DataTypes.JSONB,
  }, {
    tableName: 'Locations',
    paranoid: true,
    timestamps: true,
  });

  Location.associate = (models) => {
    Location.belongsTo(models.Location, {
      foreignKey: 'parent_location_id',
      as: 'parent',
    });
    Location.hasMany(models.Location, {
      foreignKey: 'parent_location_id',
      as: 'children',
    });
    Location.belongsToMany(models.Listing, {
      through: 'ListingLocations',
      foreignKey: 'location_id',
      as: 'listings',
    });
  };

  return Location;
};