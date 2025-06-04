export default (sequelize, DataTypes) => {
  const CustomerProfile = sequelize.define('CustomerProfile', {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preferred_language: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'customer_profiles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  CustomerProfile.associate = (models) => {
    CustomerProfile.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return CustomerProfile;
};