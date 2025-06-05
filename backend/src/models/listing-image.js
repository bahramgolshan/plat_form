import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ListingImage = sequelize.define('ListingImage', {
    image_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    image_url: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    caption: DataTypes.STRING(255),
    sort_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_primary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'ListingImages',
    paranoid: true,
    timestamps: false,
    createdAt: true,
    updatedAt: false,
  });

  ListingImage.associate = (models) => {
    ListingImage.belongsTo(models.Listing, {
      foreignKey: 'listing_id',
      as: 'listing',
    });
  };

  return ListingImage;
};