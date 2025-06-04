export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('refresh_tokens', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },
    token: {
      type: Sequelize.STRING(255),
      allowNull: false,
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
    expires_at: {
      type: Sequelize.DATE,
      allowNull: false,
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
  });

  await queryInterface.addIndex('refresh_tokens', ['token'], {
    name: 'refresh_tokens_token_idx',
  });

  await queryInterface.addIndex('refresh_tokens', ['user_id'], {
    name: 'refresh_tokens_user_id_idx',
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeIndex('refresh_tokens', 'refresh_tokens_token_idx');
  await queryInterface.removeIndex('refresh_tokens', 'refresh_tokens_user_id_idx');
  await queryInterface.dropTable('refresh_tokens');
}
