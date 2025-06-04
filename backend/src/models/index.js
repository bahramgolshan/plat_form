import { Sequelize } from 'sequelize'
import dbConfig from '../config/db.config.js'

// Import models
import UserModel from './user.model.js'
import RoleModel from './role.model.js'
import UserRoleModel from './user-role.model.js'
import RefreshTokenModel from './refresh-token.model.js'
import PasswordResetTokenModel from './password-reset-token.model.js'
import CustomerProfileModel from './customer-profile.model.js'
import SupplierProfileModel from './supplier-profile.model.js'
import EmployeeProfileModel from './employee-profile.model.js'

// Initialize Sequelize instance
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig.options
)

// Prepare db object
const db = {
  Sequelize,
  sequelize,
}

// Register models
db.User = UserModel(sequelize, Sequelize)
db.Role = RoleModel(sequelize, Sequelize)
db.UserRole = UserRoleModel(sequelize, Sequelize)
db.RefreshToken = RefreshTokenModel(sequelize, Sequelize)
db.PasswordResetToken = PasswordResetTokenModel(sequelize, Sequelize)
db.CustomerProfile = CustomerProfileModel(sequelize, Sequelize)
db.SupplierProfile = SupplierProfileModel(sequelize, Sequelize)
db.EmployeeProfile = EmployeeProfileModel(sequelize, Sequelize)

// Setup associations
Object.values(db).forEach((model) => {
  if (model.associate) model.associate(db)
})

export { db, sequelize, Sequelize }
