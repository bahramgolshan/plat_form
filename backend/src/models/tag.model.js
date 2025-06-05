import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Tag = sequelize.define('Tag', {
    tag_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'Tags',
    paranoid: true,
    timestamps: false,
    createdAt: true,
    updatedAt: false,
  });

  Tag.associate = (models) => {
    Tag.belongsToMany(models.Listing, {
      through: 'ListingTags',
      foreignKey: 'tag_id',
      as: 'listings',
    });
  };

  return Tag;
};