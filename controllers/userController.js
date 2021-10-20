const user = require("../models/user");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { passwordGenerator } = require("../utils/pwdgenerator");
const errorHandler = require("../utils/errorHandler");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    userDetails = req.body;
    userDetails.password = passwordGenerator();
    await user.create(userDetails).then(() => { res.status(201).json({ success: true, message: "User Registered" }) });

});

// exports.loginUser = async (req, res, next) => {
//     const { email, password } = req.body;
//     if (!email || !password)
//         return next(new Err)
//     const
// }