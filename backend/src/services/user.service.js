import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import { db } from '../models/index.js'
import ApiError from '../utils/api-error.util.js'

const { User } = db

const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  })

  const roles = await user.getRoles({ attributes: ['key', 'name'] })
  console.log(roles)

  return { user, roles }
}

const updateUserById = async (userId, updateBody) => {
  const user = await User.findByPk(userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  if (updateBody.email && (await User.findOne({ where: { email: updateBody.email } }))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Email already taken')
  }

  Object.assign(user, updateBody)
  await user.save()
  return user
}

const deleteUserById = async (userId) => {
  const user = await User.findByPk(userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  await user.destroy()
}

export default {
  getUserById,
  updateUserById,
  deleteUserById,
}
