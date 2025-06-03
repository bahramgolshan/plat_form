import Joi from '@hapi/joi'

const register = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  role: Joi.string().valid('customer', 'supplier').default('customer'),
})

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

const refreshTokens = Joi.object({
  refreshToken: Joi.string().required(),
})

const logout = Joi.object({
  refreshToken: Joi.string().required(),
})

const forgotPassword = Joi.object({
  email: Joi.string().email().required(),
})

const resetPassword = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(8).required(),
})

export default { register, login, refreshTokens, logout, forgotPassword, resetPassword }
