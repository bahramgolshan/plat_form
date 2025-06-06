import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const CategoryAttribute = sequelize.define(
    'CategoryAttribute',
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
        type: DataTypes.ENUM('string', 'number', 'date', 'boolean', 'select'),
        allowNull: false,
      },
      isRequired: {
        field: 'is_required',
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      sortOorder: {
        field: 'sort_order',
        type: DataTypes.INTEGER,
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
      tableName: 'category_attributes',
      paranoid: true,
      timestamps: false,
    }
  )

  CategoryAttribute.associate = (models) => {
    CategoryAttribute.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    })
    // CategoryAttribute.hasMany(models.ListingAttribute, {
    //   foreignKey: 'attribute_id',
    //   as: 'values',
    // })
  }

  return CategoryAttribute
}
