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
  res.status(200).json({ success: true, message: "Password Changed" });
});

//Function that returns user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  let user;
  if (req.body.userId)
    user = await User.findByPk(req.body.userId, {
      attributes: { exclude: ["createdAt", "updatedAt", "password"] },
    });
  else if (req.body.emailId)
    user = await User.findOne({
      where: { emailId: req.body.emailId },
      attributes: { exclude: ["createdAt", "updatedAt", "password"] },
    });
  else next(new ErrorHandler("No User Id or email Id found", 400));
  if (user == null)
    res.status(401).json({ success: false, message: "User doesn't exist" });
  const isSameUser = req.session.userId == user.userId;
  res.status(200).json({ success: true, isSameUser: isSameUser, user });
});

// Function that updates user profile
exports.updateUserDetails = catchAsyncErrors(async (req, res, next) => {
  const data = req.body;
  const userId = req.session.userId;
  if (userId != data.userId) next(new ErrorHandler("User Id mismatch"), 400);
  await User.findByPk(userId).then(async (user) => {
    if (user == null) next(new ErrorHandler("Expected Key Not Found", 500));
    else {
      for (let [key, value] of Object.entries(data))
        if (user[key]) user[key] = value;
      await user.save();
    }
  });
  res.status(200).json({ success: true, message: "User Details Updated" });
});

//Function that deletes current user details
