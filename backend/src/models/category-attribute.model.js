import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const CategoryAttribute = sequelize.define('CategoryAttribute', {
    attribute_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    attribute_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    attribute_type: {
      type: DataTypes.ENUM('string', 'number', 'date', 'boolean', 'select'),
      allowNull: false,
    },
    is_required: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    sort_order: DataTypes.INTEGER,
  }, {
    tableName: 'CategoryAttributes',
    paranoid: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });

  CategoryAttribute.associate = (models) => {
    CategoryAttribute.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    });
    CategoryAttribute.hasMany(models.ListingAttributeValue, {
      foreignKey: 'attribute_id',
      as: 'values',
    });
  };

  return CategoryAttribute;
};