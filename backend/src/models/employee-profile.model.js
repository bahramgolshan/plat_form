export default (sequelize, DataTypes) => {
  const EmployeeProfile = sequelize.define(
    'EmployeeProfile',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      department: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      notes: {
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
      tableName: 'employee_profiles',
      timestamps: true,
    }
  )

  EmployeeProfile.associate = (models) => {
    EmployeeProfile.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    })
  }

  return EmployeeProfile
}
