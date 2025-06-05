import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ListingTranslation = sequelize.define('ListingTranslation', {
    translation_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    language_code: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: DataTypes.TEXT,
  }, {
    tableName: 'ListingTranslations',
    timestamps: true,
    paranoid: false,
  });

  ListingTranslation.associate = (models) => {
    ListingTranslation.belongsTo(models.Listing, {
      foreignKey: 'listing_id',
      as: 'listing',
    });
  };

  return ListingTranslation;
};