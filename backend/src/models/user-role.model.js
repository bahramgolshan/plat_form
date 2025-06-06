export default (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    'UserRole',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        field: 'user_id',
        type: DataTypes.UUID,
        allowNull: false,
      },
      roleId: {
        field: 'role_id',
        type: DataTypes.INTEGER,
        allowNull: false,
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
      tableName: 'user_roles',
      timestamps: true,
    }
  )

  UserRole.associate = (models) => {
    UserRole.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    })
    UserRole.belongsTo(models.Role, {
      foreignKey: 'role_id',
      as: 'role',
    })
  }

  return UserRole
}
