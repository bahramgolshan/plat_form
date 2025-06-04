export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('users', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    first_name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: true, // Allow null for social login users
    },
    isEmailVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      field: 'is_email_verified',
    },
    verificationToken: {
      type: Sequelize.STRING,
      field: 'verification_token',
    },
    lastLoginAt: {
      type: Sequelize.DATE,
      field: 'last_login_at',
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  })

  await queryInterface.addIndex('users', ['email'], {
    name: 'users_email_index',
    unique: true,
  })
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('users')
}
