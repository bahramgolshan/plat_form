import httpStatus from 'http-status'
import userService from '../services/user.service.js'
import authService from '../services/auth.service.js'

const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user.id)

    res.api(httpStatus.OK, 'success', user)
  } catch (error) {
    next(error)
  }
}

const updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateUserById(req.user.id, req.body)

    res.api(httpStatus.NO_CONTENT, 'Profile updated successfully', user)
  } catch (error) {
    next(error)
  }
}

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body
    await authService.changePassword(req.user.id, currentPassword, newPassword)

    res.api(httpStatus.NO_CONTENT, 'Password changed successfully')
  } catch (error) {
    next(error)
  }
}

const deleteProfile = async (req, res, next) => {
  try {
    await userService.deleteUserById(req.user.id)
    res.api(httpStatus.NO_CONTENT, 'Profile deleted successfully')
  } catch (error) {
    next(error)
  }
}

export default {
  getProfile,
  updateProfile,
  changePassword,
  deleteProfile,
}
