class ApiResponse {
  constructor(statusCode, message = null, data = null) {
    this.code = statusCode
    this.message = message
    this.data = data
  }

  timestamp = new Date().toISOString()
}

export default ApiResponse
