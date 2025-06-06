import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const ListingTranslation = sequelize.define(
    'ListingTranslation',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      languageCode: {
        field: 'language_code',
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: DataTypes.TEXT,
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
      tableName: 'listing_translations',
      timestamps: true,
      paranoid: false,
    }
  )

  ListingTranslation.associate = (models) => {
    ListingTranslation.belongsTo(models.Listing, {
      foreignKey: 'listing_id',
      as: 'listing',
    })
  }

  return ListingTranslation
}
