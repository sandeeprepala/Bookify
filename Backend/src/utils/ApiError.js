class ApiError extends Error {
    constructor( // Constructor for ApiError class
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)      // Call the parent constructor with the message
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if (stack) { // If a stack trace is provided, use it
            this.stack = stack
        } else{ // Otherwise, capture the stack trace from the current context
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}