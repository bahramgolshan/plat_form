import { Sequelize } from 'sequelize'
import dbConfig from '../config/db.config.js'

// Import models
import UserModel from './user.model.js'
import RoleModel from './role.model.js'
import UserRoleModel from './user-role.model.js'
import RefreshTokenModel from './refresh-token.model.js'
import PasswordResetTokenModel from './password-reset-token.model.js'
import EmployeeProfileModel from './employee-profile.model.js'
import SupplierProfileModel from './supplier-profile.model.js'
import CustomerProfileModel from './customer-profile.model.js'
import CategoryModel from './category.model.js'
import CategoryAttributeModel from './category-attribute.model.js'
import ListingModel from './listing.model.js'
import ListingAttributeValueModel from './listing-attribute-value.model.js'
import ListingImageModel from './listing-image.model.js'
import LocationModel from './location.model.js'
import ListingLocationModel from './listing-location.model.js'
import PriceTierModel from './price-tier.model.js'
import ListingScheduleModel from './listing-schedule.model.js'
import ListingAvailabilityModel from './listing-availability.model.js'
import ListingExclusionModel from './listing-exclusion.model.js'
import ListingTranslationModel from './listing-translation.model.js'
import TagModel from './tag.model.js'
import ListingTagModel from './listing-tag.model.js'

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

db.Category = CategoryModel(sequelize, Sequelize)
db.CategoryAttribute = CategoryAttributeModel(sequelize, Sequelize)
db.Listing = ListingModel(sequelize, Sequelize)
db.ListingAttributeValue = ListingAttributeValueModel(sequelize, Sequelize)
db.ListingImage = ListingImageModel(sequelize, Sequelize)
db.Location = LocationModel(sequelize, Sequelize)
db.ListingLocation = ListingLocationModel(sequelize, Sequelize)
db.PriceTier = PriceTierModel(sequelize, Sequelize)
db.ListingSchedule = ListingScheduleModel(sequelize, Sequelize)
db.ListingAvailability = ListingAvailabilityModel(sequelize, Sequelize)
db.ListingExclusion = ListingExclusionModel(sequelize, Sequelize)
db.ListingTranslation = ListingTranslationModel(sequelize, Sequelize)
db.Tag = TagModel(sequelize, Sequelize)
db.ListingTag = ListingTagModel(sequelize, Sequelize)

// Setup associations
Object.values(db).forEach((model) => {
  if (model.associate) model.associate(db)
})

export { db, sequelize, Sequelize }
