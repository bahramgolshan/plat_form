import Joi from '@hapi/joi'

const updateProfile = Joi.object({
  email: Joi.string().email(),
  firstName: Joi.string(),
  lastName: Joi.string(),
}).min(1) // At least one field must be provided

const changePassword = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(8).required(),
})

export default {
  updateProfile,
  changePassword,
}
