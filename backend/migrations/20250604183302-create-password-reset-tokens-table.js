export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('password_reset_tokens', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    token: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    expires_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    is_used: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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

  await queryInterface.addIndex('password_reset_tokens', ['token'], {
    name: 'password_reset_tokens_token_idx',
  })

  await queryInterface.addIndex('password_reset_tokens', ['user_id'], {
    name: 'password_reset_tokens_user_id_idx',
  })
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeIndex('password_reset_tokens', 'password_reset_tokens_token_idx')
  await queryInterface.removeIndex('password_reset_tokens', 'password_reset_tokens_user_id_idx')
  await queryInterface.dropTable('password_reset_tokens')
}
