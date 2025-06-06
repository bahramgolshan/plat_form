import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const ListingTag = sequelize.define(
    'ListingTag',
    {
      createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      tableName: 'listing_tags',
      timestamps: false,
      createdAt: true,
      updatedAt: false,
    }
  )

  ListingTag.associate = (models) => {
    ListingTag.belongsTo(models.Listing, {
      foreignKey: 'listing_id',
      as: 'listing',
    })
    ListingTag.belongsTo(models.Tag, {
      foreignKey: 'tag_id',
      as: 'tag',
    })
  }

  return ListingTag
}
