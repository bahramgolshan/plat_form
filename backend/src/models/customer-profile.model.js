export default (sequelize, DataTypes) => {
  const CustomerProfile = sequelize.define(
    'CustomerProfile',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      dateOfBirth: {
        field: 'date_of_birth',
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      preferredLanguage: {
        field: 'preferred_language',
        type: DataTypes.STRING,
        allowNull: true,
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
      tableName: 'customer_profiles',
      timestamps: true,
    }
  )

  CustomerProfile.associate = (models) => {
    CustomerProfile.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    })
  }

  return CustomerProfile
}
