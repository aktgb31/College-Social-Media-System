const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  if (req.session && req.session.userId) next();
  else next(new ErrorHandler("Please login to access this resource", 401));
});
