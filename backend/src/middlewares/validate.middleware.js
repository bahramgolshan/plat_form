import httpStatus from 'http-status'
import ApiError from '../utils/api-error.util.js'

export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
  })

  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(', ')
    return next(new ApiError(httpStatus.NOT_FOUND, errorMessage))
  }

  req.body = value
  next()
}
