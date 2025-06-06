export default (sequelize, DataTypes) => {
  const SupplierProfile = sequelize.define(
    'SupplierProfile',
    {
      userId: {
        field: 'user_id',
        type: DataTypes.UUID,
        primaryKey: true,
      },
      companyName: {
        field: 'company_name',
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyWebsite: {
        field: 'company_website',
        type: DataTypes.STRING,
        allowNull: true,
      },
      taxId: {
        field: 'tax_id',
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
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
      tableName: 'supplier_profiles',
      timestamps: true,
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
