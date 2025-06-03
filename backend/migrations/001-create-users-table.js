export const createUsersTable = async (sequelize) => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255),
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      role VARCHAR(50) NOT NULL DEFAULT 'customer',
      is_email_verified BOOLEAN NOT NULL DEFAULT false,
      verification_token VARCHAR(255),
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      last_login_at TIMESTAMP WITH TIME ZONE
    );

    CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);
  `

  try {
    await sequelize.query(query)
    console.log('Users table created successfully.')
  } catch (error) {
    console.error('Error creating users table:', error)
    throw error
  }
}
