import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUser,
  password: config.dbPassword,
  database: config.dbDatabase,
  logging: false,
})

const runMigrations = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection to database established successfully.')

    // Import all migration files
    const { createUsersTable } = await import('./001-create-users-table.js')
    const { createRefreshTokensTable } = await import('./002-create-refresh-tokens-table.js')
    const { createPasswordResetTokensTable } = await import(
      './003-create-password-reset-tokens-table.js'
    )

    // Run migrations in order
    await createUsersTable(sequelize)
    await createRefreshTokensTable(sequelize)
    await createPasswordResetTokensTable(sequelize)
    await createSocialAuthTable(sequelize)

    console.log('All migrations completed successfully.')
  } catch (error) {
    console.error('Error running migrations:', error)
  } finally {
    await sequelize.close()
  }
}

runMigrations()
