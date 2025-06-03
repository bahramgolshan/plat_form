import ApiResponse from '../utils/ApiResponse.js'

/**
 * @typedef {import('express').Response} ExpressResponse
 */

/**
 * @param {import('express').Request} req
 * @param {ExpressResponse & { api: (statusCode: number, status: string, message: string, data?: any) => void }} res
 * @param {import('express').NextFunction} next
 */
export const responseEnhancer = (req, res, next) => {
  /**
   * Send a formatted API response
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Descriptive message
   * @param {any} [data] - Optional data payload
   */
  res.api = (statusCode, message = null, data = null) => {
    return res.status(statusCode).json(new ApiResponse(statusCode, message, data))
  }

  next()
}
