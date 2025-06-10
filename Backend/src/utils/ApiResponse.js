class ApiResponse { // Represents a standardized API response
    constructor(statusCode, data, message = "Success"){         // Constructor for ApiResponse class
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400 // Success if status code is less than 400  
    }
}

export { ApiResponse }