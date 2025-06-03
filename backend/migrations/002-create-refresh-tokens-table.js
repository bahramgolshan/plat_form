export const createRefreshTokensTable = async (sequelize) => {
  const query = `
    CREATE TABLE IF NOT EXISTS refresh_tokens (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      token VARCHAR(255) NOT NULL,
      user_id UUID NOT NULL,
      expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS refresh_tokens_token_idx ON refresh_tokens(token);
    CREATE INDEX IF NOT EXISTS refresh_tokens_user_id_idx ON refresh_tokens(user_id);
  `

  try {
    await sequelize.query(query)
    console.log('Refresh tokens table created successfully.')
  } catch (error) {
    console.error('Error creating refresh tokens table:', error)
    throw error
  }
}
