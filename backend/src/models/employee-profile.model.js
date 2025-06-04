export default (sequelize, DataTypes) => {
  const EmployeeProfile = sequelize.define(
    'EmployeeProfile',
    {
      user_id: {
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
    },
    {
      tableName: 'employee_profiles',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
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
