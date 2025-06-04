export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING(100),
        field: 'first_name',
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(100),
        field: 'last_name',
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true, // Allow null for social login users
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_email_verified',
      },
      verificationToken: {
        type: DataTypes.STRING,
        field: 'verification_token',
      },
      lastLoginAt: {
        type: DataTypes.DATE,
        field: 'last_login_at',
      },
    },
    {
      tableName: 'users',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
        withPassword: {
          attributes: { include: ['password'] },
        },
      },
    }
  )

  User.associate = (models) => {
    User.belongsToMany(models.Role, {
      through: models.UserRole,
      foreignKey: 'user_id',
      otherKey: 'role_id',
      as: 'roles',
    })
    User.hasOne(models.PasswordResetToken, {
      foreignKey: 'user_id',
      as: 'passwordResetToken',
    })
    User.hasOne(models.RefreshToken, {
      foreignKey: 'user_id',
      as: 'RefreshToken',
    })
    User.hasOne(models.SupplierProfile, {
      foreignKey: 'user_id',
      as: 'supplierProfile',
    })
    User.hasOne(models.CustomerProfile, {
      foreignKey: 'user_id',
      as: 'customerProfile',
    })
    User.hasOne(models.EmployeeProfile, {
      foreignKey: 'user_id',
      as: 'employeeProfile',
    })
  }

  // toJSON override to auto-strip sensitive fields
  User.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
  }

  return User
}
