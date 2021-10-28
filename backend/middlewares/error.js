const { ENVIRONMENT } = require("../config");
const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  if (ENVIRONMENT == "development") console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
