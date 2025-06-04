import dotenv from 'dotenv'

dotenv.config()

export const config = {
  // Server
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  apiBaseUrl: process.env.API_BASE_URL,
  frontendUrl: process.env.FRONTEND_URL,

  // Database
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbDatabase: process.env.DB_DATABASE,
  dbSsl: process.env.DB_SSL,

  // Redis
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  redisPassword: process.env.REDIS_PASSWORD,

  //   JWT
  jwtSecret: process.env.JWT_SECRET,
  jwtAccessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
  jwtRefreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
  jwtResetPasswordExpirationMinutes: process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
  jwtVerifyEmailExpirationMinutes: process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,

  //   Email
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT,
  smtpUsername: process.env.SMTP_USERNAME,
  smtpPassword: process.env.SMTP_PASSWORD,
  emailFrom: process.env.EMAIL_FROM,
  emailFromName: process.env.EMAIL_FROM_NAME,

  //   OAuth
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  facebookAppId: process.env.FACEBOOK_APP_ID,
  facebookAppSecret: process.env.FACEBOOK_APP_SECRET,
}
