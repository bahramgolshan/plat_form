import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const ListingExclusion = sequelize.define(
    'ListingExclusion',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      exclusionDate: {
        field: 'exclusion_date',
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      reason: {
        field: 'exclusion_date',
        type: DataTypes.STRING(255),
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
      tableName: 'listing_exclusions',
      paranoid: true,
      timestamps: false,
    }
  )

  ListingExclusion.associate = (models) => {
    ListingExclusion.belongsTo(models.Listing, {
      foreignKey: 'listing_id',
      as: 'listing',
    })
  }

  return ListingExclusion
}
