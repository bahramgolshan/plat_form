import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import db from '../models/index.js'
import ApiError from '../utils/ApiError.js'

const { User } = db

const getUserById = async (id) => {
  return await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  })
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

const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findByPk(userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  if (!(await bcrypt.compare(currentPassword, user.password))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Current password is incorrect')
  }

  user.password = await bcrypt.hash(newPassword, 10)
  await user.save()
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
  changePassword,
  deleteUserById,
}
