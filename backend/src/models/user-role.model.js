export default (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'user_roles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  UserRole.associate = (models) => {
    UserRole.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    UserRole.belongsTo(models.Role, {
      foreignKey: 'role_id',
      as: 'role',
    });
  };

  return UserRole;
};