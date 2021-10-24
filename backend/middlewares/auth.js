const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// To stop already logined user from accessing login and register page
exports.isLoginedUser = catchAsyncErrors(async (req, res, next) => {
  if (req.session && req.session.userId)
    next(new ErrorHandler("User already logined", 401));
  else next();
});

// To stop not logined user from accessing other features
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  if (req.session && req.session.userId) next();
  else next(new ErrorHandler("Please login to access this resource", 401));
});
