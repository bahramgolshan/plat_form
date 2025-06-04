export default (sequelize, DataTypes) => {
  const SupplierProfile = sequelize.define(
    'SupplierProfile',
    {
      user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company_website: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tax_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: 'supplier_profiles',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )

  SupplierProfile.associate = (models) => {
    SupplierProfile.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    })
  }

  return SupplierProfile
}
