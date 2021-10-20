const User = require("../models/user");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { passwordGenerator } = require("../utils/pwdGenerator");
const ErrorHandler = require("../utils/errorHandler");
const { hash } = require("../utils/encrypt");

// Function to Register a new user
exports.register = catchAsyncErrors(async (req, res, next) => {
  userDetails = req.body;
  userDetails.password = passwordGenerator(); // Generate Random Password
  if (userDetails.gender.toUpperCase() == "FEMALE")
    // Applying correct profile pic gender-wise
    userDetails.profilePic = "female.png";
  else userDetails.profilePic = "male.png";
  console.log(userDetails);
  await User.create(userDetails);
  res.status(201).json({ success: true, message: "User Registered" });
});

//Function to login new user
exports.login = catchAsyncErrors(async (req, res, next) => {
  const emailId = req.body.emailId;
  const password = hash(emailId + req.body.password);
  if (!emailId || !password) {
    return next(new ErrorHandler("Please Enter Email and Password", 400));
  }
  const user = await User.findOne({
    attributes: ["userId", "emailId", "password"],
    where: { emailId: emailId, password: password },
  });
  if (!user) {
    return next(new ErrorHandler("Invalid Username or Password"), 400);
  }
  req.session.userId = user.userId;
  res.status(200).json({ success: true, message: "Login Successful" });
});

//Function to logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  req.session.destroy();
  res.status(200).json({ success: true, message: "Logout Successful" });
});

//Function to change password
exports.changePassword = catchAsyncErrors(async (req, res, next) => {
  const userId = req.session.userId;
  const newPassword = req.body.newPassword;
  await User.findByPk(userId).then(async (user) => {
    if (user == null) next(new ErrorHandler("Expected Key Not Found", 500));
    else {
      user.password = newPassword;
      await user.save();
    }
  });
  res
    .status(200)
    .json({ success: true, message: "Password Changed Successfully" });
});

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByPk(req.body.userId).toJSON();
  res.status(200).json({ success: true, user });
});
