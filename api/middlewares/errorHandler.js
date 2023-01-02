
// Create  express error handler

const errorHandler = (error, req, res, next) => {

    const errorStatus = error.status || 500
    const errorMessage = error.message || "Unknown errors"

     return res.status(errorStatus).json({
        message : errorStatus,
        status : errorMessage,
        stack : error.stack
     });
}

export default errorHandler