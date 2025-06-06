import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Category = sequelize.define(
    'Category',
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
      slug: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      icon: DataTypes.STRING(255),
      isActive: {
        field: 'is_active',
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      metadata: DataTypes.JSONB,
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
      tableName: 'categories',
      paranoid: true,
      timestamps: true,
    }
  )

  Category.associate = (models) => {
    Category.belongsTo(models.Category, {
      foreignKey: 'parent_id',
      as: 'parent',
    })
    Category.hasMany(models.Category, {
      foreignKey: 'parent_id',
      as: 'children',
    })
    Category.hasMany(models.CategoryAttribute, {
      foreignKey: 'category_id',
      as: 'attributes',
    })
    Category.hasMany(models.Listing, {
      foreignKey: 'category_id',
      as: 'listings',
    })
  }

  return Category
}
