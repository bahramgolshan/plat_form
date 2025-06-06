import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ReviewAttribute = sequelize.define('reviewAttribute', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    }
  }, {
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    tableName: 'review_attributes'
  });

  ReviewAttribute.associate = (models) => {
    ReviewAttribute.belongsTo(models.Review, {
      foreignKey: 'review_id',
      as: 'review'
    });
    ReviewAttribute.belongsTo(models.CategoryAttribute, {
      foreignKey: 'attribute_id',
      as: 'attribute'
    });
  };

  return ReviewAttribute;
};