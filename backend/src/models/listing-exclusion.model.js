import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ListingExclusion = sequelize.define('ListingExclusion', {
    exclusion_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    exclusion_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    reason: DataTypes.STRING(255),
  }, {
    tableName: 'ListingExclusions',
    paranoid: true,
    timestamps: false,
    createdAt: true,
    updatedAt: false,
  });

  ListingExclusion.associate = (models) => {
    ListingExclusion.belongsTo(models.Listing, {
      foreignKey: 'listing_id',
      as: 'listing',
    });
  };

  return ListingExclusion;
};