import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ListingImage = sequelize.define('ListingImage', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    imageUrl: {
      field: 'image_url',
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    caption: DataTypes.STRING(255),
    sortOrder: {
      field: 'sort_order',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isPrimary: {
      field: 'is_primary',
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
  }, {
    tableName: 'listing_images',
    paranoid: true,
    timestamps: false,
  });

  ListingImage.associate = (models) => {
    ListingImage.belongsTo(models.Listing, {
      foreignKey: 'listing_id',
      as: 'listing',
    });
  };

  return ListingImage;
};