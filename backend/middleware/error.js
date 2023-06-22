const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid : ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //  mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //   wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is Invalid , Try again`;
    err = new ErrorHandler(message, 400);
  }

  //   wrong JWT error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired , Try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    err: err.message,
  });
};
