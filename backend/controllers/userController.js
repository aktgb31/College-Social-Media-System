const { User, Student, Club } = require("../models/user");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { passwordGenerator } = require("../utils/pwdGenerator");
const ErrorHandler = require("../utils/errorHandler");
const { hash } = require("../utils/encrypt");
const { sendVerificationEmail } = require("../utils/sendEmail");
const { formatStudentDetails, formatClubDetails } = require("../utils/userUtils");
const { Session } = require("../models/sessionStore");

//Function to register a new user
async function register(userDetails, model) {
    const user = await User.findOne({ where: { emailId: userDetails.emailId }, raw: true });
    if (user) {
        throw new ErrorHandler(409, "User already exists");
    }
    const userInserted = await User.create(userDetails);
    userDetails.userId = userInserted.userId;
    try {
        const y = await model.create(userDetails);
        try {
            await sendVerificationEmail(userDetails.emailId, userDetails.password);
        } catch (err) {
            y.destroy(); // No waiting for destruction
            throw err;
        }
    } catch (err) {
        userInserted.destroy(); // No waiting for destruction
        throw err;
    }
}

// Function to Register a new student
exports.registerStudent = catchAsyncErrors(async(req, res, next) => {
    let userDetails = formatStudentDetails(req.body.firstName, req.body.lastName, req.body.emailId, req.body.passingYear, req.body.branch, req.body.dob, req.body.gender);
    userDetails.userType = "STUDENT";
    userDetails.password = passwordGenerator();
    await register(userDetails, Student);
    res.status(201).json({
        success: true,
        message: "Student Registered Successfully",
    });
});

//Function to Register a new club
exports.registerClub = catchAsyncErrors(async(req, res, next) => {
    let userDetails = formatClubDetails(req.body.name, req.body.emailId, req.body.clubType);
    userDetails.userType = "CLUB";
    userDetails.password = passwordGenerator();
    await register(userDetails, Club);
    res.status(201).json({
        success: true,
        message: "Club Registered Successfully",
    });
});


//Function to login  user
exports.login = catchAsyncErrors(async(req, res, next) => {
    if (!req.body.emailId || !req.body.password) {
        return next(new ErrorHandler(400, "Please Enter Email and Password"));
    }
    const emailId = req.body.emailId;
    const password = hash(emailId + req.body.password);

    const user = await User.findOne({
        where: { emailId: emailId, password: password },
    });
    if (!user) {
        return next(new ErrorHandler(400, "Invalid Username or Password"));
    }
    req.session.userId = user.userId;
    req.session.userType = user.type;
    user.verified = true;
    user.save(); // No waiting for saving
    res.status(202).json({ success: true, message: "Login Successful" });
});

//Function to logout
exports.logout = catchAsyncErrors(async(req, res, next) => {
    req.session.destroy();
    res.status(200).json({ success: true, message: "Logout Successful" });
});

//Function to change password
exports.changePassword = catchAsyncErrors(async(req, res, next) => {
    const userId = req.session.userId;
    const newPassword = req.body.newPassword;
    await User.findByPk(userId).then(async(user) => {
        if (user == null) next(new ErrorHandler(500, "Expected Key Not Found"));
        else {
            user.password = hash(User.emailId + newPassword);
            await user.save();
        }
    });
    res.status(200).json({ success: true, message: "Password Changed" });
});

//Function that returns user details
exports.getUserDetails = catchAsyncErrors(async(req, res, next) => {
    let user = null;
    if (req.body.userId)
        user = await User.findByPk(req.body.userId, {
            attributes: { exclude: ["createdAt", "updatedAt", "password"] },
            raw: true
        });
    else if (req.body.emailId)
        user = await User.findOne({
            where: { emailId: req.body.emailId },
            attributes: { exclude: ["createdAt", "updatedAt", "password"] },
            raw: true
        });
    else return next(new ErrorHandler(400, "No User Id or email Id is required"));
    if (user == null)
        return next(new ErrorHandler(404, "User not found"));
    if (user.userType == "STUDENT")
        user.student = await Student.findByPk(user.userId, { attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] }, raw: true });
    else
        user.club = await Club.findByPk(user.userId, { attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] }, raw: true });
    const isSameUser = req.session.userId == user.userId;
    res.status(200).json({ success: true, isSameUser: isSameUser, user });
});

// Function that updates user profile
exports.updateUserDetails = catchAsyncErrors(async(req, res, next) => {
    const data = req.body;
    const userId = req.session.userId;
    if (userId != data.userId) next(new ErrorHandler(400, "User Id mismatch"));
    await User.findByPk(userId).then(async(user) => {
        if (user == null) next(new ErrorHandler(500, "Expected Key Not Found"));
        else {
            for (let [key, value] of Object.entries(data))
                if (user[key]) user[key] = value;
            await user.save();
        }
    });
    res.status(200).json({ success: true, message: "User Details Updated" });
});

//Function that deletes current user details
exports.deleteUser = catchAsyncErrors(async(req, res, next) => {
    const userId = req.session.userId;
    await User.destroy({ where: { userId: userId } });
    await Session.destroy({ where: { userId: userId } });
    res.status(200).json({ success: true, message: "User Deleted" });
});