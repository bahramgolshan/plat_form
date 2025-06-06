import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Tag = sequelize.define(
    'Tag',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
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
      tableName: 'tags',
      paranoid: true,
      timestamps: false,
    }
  )

  Tag.associate = (models) => {
    Tag.belongsToMany(models.Listing, {
      through: 'ListingTags',
      foreignKey: 'tag_id',
      as: 'listings',
    })
  }

  return Tag
}
