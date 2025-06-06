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
        field: 'first_name',
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      lastName: {
        field: 'last_name',
        type: DataTypes.STRING(100),
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
        field: 'is_email_verified',
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verificationToken: {
        field: 'verification_token',
        type: DataTypes.STRING,
      },
      lastLoginAt: {
        field: 'last_login_at',
        type: DataTypes.DATE,
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
      tableName: 'users',
      timestamps: true,
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
      as: 'refreshToken',
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
