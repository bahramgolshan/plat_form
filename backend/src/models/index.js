// Import models
import { Sequelize, sequelize, db } from '../config/db.js'
import User from './user.model.js'
import RefreshToken from './refreshToken.model.js'
import PasswordResetToken from './passwordResetToken.model.js'

// Register models
db.User = User(sequelize, Sequelize)
db.RefreshToken = RefreshToken(sequelize, Sequelize)
db.PasswordResetToken = PasswordResetToken(sequelize, Sequelize)

// Setup associations
db.User.hasMany(db.RefreshToken, { foreignKey: 'user_id', as: 'refreshTokens' })
db.RefreshToken.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' })

db.User.hasMany(db.PasswordResetToken, { foreignKey: 'user_id', as: 'passwordResetTokens' })
db.PasswordResetToken.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' })

export default db
