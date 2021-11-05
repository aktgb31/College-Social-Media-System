const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// To stop already logined user from accessing login and register page
exports.isLoginedUser = catchAsyncErrors(async(req, res, next) => {
    if (req.session && req.session.userId)
        next(new ErrorHandler(403, "User already logged in"));
    else next();
});

// To stop not logined user from accessing other features
exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next) => {
    if (req.session && req.session.userId) next();
    else next(new ErrorHandler(401, "Please login to access this resource"));
});