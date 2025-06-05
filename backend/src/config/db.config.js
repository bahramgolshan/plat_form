import logger from '../utils/logger.util.js'
import { config } from './index.js'

// DB credentials and Sequelize options
const dbConfig = {
  database: config.dbDatabase,
  username: config.dbUser,
  password: config.dbPassword,
  options: {
    host: config.dbHost,
    port: config.dbPort,
    dialect: 'postgres',
    logging: config.environment === 'development' ? (msg) => logger.debug(msg) : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl:
        config.dbSsl === 'true'
          ? {
              require: true,
              rejectUnauthorized: false,
            }
          : false,
    },
  },
}

export default dbConfig
