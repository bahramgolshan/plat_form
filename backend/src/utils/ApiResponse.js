class ApiResponse {
  constructor(statusCode, message = null, data = null) {
    this.code = statusCode
    this.message = message
    this.data = data
  }
}

export default ApiResponse
