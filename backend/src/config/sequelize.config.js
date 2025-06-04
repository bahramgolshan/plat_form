import { config } from './index.js'

export default {
  development: {
    host: config.dbHost,
    port: config.dbPort,
    username: config.dbUser,
    password: config.dbPassword,
    database: config.dbDatabase,
    dialect: 'postgres',
  },
}
