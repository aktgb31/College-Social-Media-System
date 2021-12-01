const { User, Student, Club } = require("../models/user");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { passwordGenerator } = require("../utils/pwdGenerator");
const ErrorHandler = require("../utils/errorHandler");
const { hash } = require("../utils/encrypt");
const { sendVerificationEmail } = require("../utils/sendEmail");
const { formatStudentDetails, formatClubDetails } = require("../utils/userUtils");
const { Session } = require("../models/sessionStore");
const { uploadProfilePic, deleteImage } = require("./fileController");

//Function to register a new user
async function register(userDetails, model, type) {
    userDetails.userType = type;
    userDetails.password = passwordGenerator();
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
    await register(userDetails, Student, "STUDENT");
    res.status(201).json({
        success: true,
        message: "Student Registered Successfully",
    });
});

//Function to Register a new club
exports.registerClub = catchAsyncErrors(async(req, res, next) => {
    let userDetails = formatClubDetails(req.body.name, req.body.emailId, req.body.clubType);
    await register(userDetails, Club, "CLUB");
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
    req.session.userType = user.userType;
    res.status(202).json({ success: true, message: "Login Successful" });
});

//Function to logout
exports.logout = catchAsyncErrors(async(req, res, next) => {
    req.session.destroy();
    req.clearCookie("connect.sid");
    res.status(200).json({ success: true, message: "Logout Successful" });
});

//Function to change password
exports.changePassword = catchAsyncErrors(async(req, res, next) => {
    const userId = req.session.userId;
    const newPassword = req.body.newPassword;
    await User.findByPk(userId).then(async(user) => {
        if (user == null) next(new ErrorHandler(500, "Expected Key Not Found"));
        else {
            user.password = newPassword;
            await user.save();
        }
    });
    res.status(200).json({ success: true, message: "Password Changed" });
});

//Function for forgot password
exports.forgotPassword = catchAsyncErrors(async(req, res, next) => {
    const emailId = req.body.emailId;
    const user = await User.findOne({ where: { emailId: emailId } });
    if (!user) {
        return next(new ErrorHandler(400, "User not found"));
    }
    const newPassword = passwordGenerator();
    user.password = newPassword
    await user.save();
    await sendVerificationEmail(emailId, newPassword);
    res.status(200).json({ success: true, message: `New Password sent to ${emailId}` });
});

//Function that returns all User details
exports.getAllUsers = catchAsyncErrors(async(req, res, next) => {
    const queryOptions = {};
    queryOptions.attributes = { exclude: ["createdAt", "updatedAt", "password"] };
    if (req.query.perPage) {
        queryOptions.limit = parseInt(req.query.perPage);
        if (req.query.page) {
            let page = parseInt(req.query.page);
            queryOptions.offset = (page - 1) * perPage;
        } else
            queryOptions.offset = 0;
    }
    queryOptions.raw = true;
    const users = await User.findAll(queryOptions);
    res.status(200).json({ success: true, data: users });
});

//Function that returns all Students details
exports.getAllStudents = catchAsyncErrors(async(req, res, next) => {

    const queryOptions = {};
    queryOptions.attributes = { exclude: ["createdAt", "updatedAt"] };
    if (req.query.perPage) {
        queryOptions.limit = parseInt(req.query.perPage);
        if (req.query.page) {
            let page = parseInt(req.query.page);
            queryOptions.offset = (page - 1) * perPage;
        } else
            queryOptions.offset = 0;
    }
    queryOptions.raw = true;
    const students = await Student.findAll(queryOptions);
    res.status(200).json({ success: true, data: students });
});

//Function that returns all Club details
exports.getAllClubs = catchAsyncErrors(async(req, res, next) => {
    const queryOptions = {};
    queryOptions.attributes = { exclude: ["createdAt", "updatedAt"] };
    if (req.query.perPage) {
        queryOptions.limit = parseInt(req.query.perPage);
        if (req.query.page) {
            let page = parseInt(req.query.page);
            queryOptions.offset = (page - 1) * perPage;
        } else
            queryOptions.offset = 0;
    }
    queryOptions.raw = true;
    const clubs = await Club.findAll(queryOptions);
    res.status(200).json({ success: true, data: clubs });
});

// Function that returns current user details
exports.getMyDetails = catchAsyncErrors(async(req, res, next) => {
    const userId = req.session.userId;
    const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] },
        raw: true
    });
    if (!user) return next(new ErrorHandler(500, "Expected Key Not Found"));
    else {
        if (user.userType == "STUDENT")
            user.student = await Student.findByPk(user.userId, { attributes: { exclude: ['userId'] }, raw: true });
        else
            user.club = await Club.findByPk(user.userId, { attributes: { exclude: ['userId'] }, raw: true });
    }
    res.status(200).json({ success: true, data: user });
});

//Function that returns any user details
exports.getUserDetails = catchAsyncErrors(async(req, res, next) => {
    let user = null;
    if (req.query.userId)
        user = await User.findByPk(parseInt(req.query.userId), {
            attributes: { exclude: ["createdAt", "updatedAt", "password"] },
            raw: true
        });
    else if (req.query.emailId)
        user = await User.findOne({
            where: { emailId: req.query.emailId },
            attributes: { exclude: ["createdAt", "updatedAt", "password"] },
            raw: true
        });
    else return next(new ErrorHandler(400, "User Id or email Id is required"));
    if (user == null)
        return next(new ErrorHandler(404, "User not found"));
    if (user.userType == "STUDENT")
        user.student = await Student.findByPk(user.userId, { attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] }, raw: true });
    else
        user.club = await Club.findByPk(user.userId, { attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] }, raw: true });
    res.status(200).json({ success: true, data: user });
});


// Function that updates user profile
exports.updateUserDetails = catchAsyncErrors(async(req, res, next) => {
    const userId = req.session.userId;
    const userType = req.session.userType;

    let Conn, userDetails = {};
    if (userType == "STUDENT") {
        userDetails = formatStudentDetails(req.body.firstName, req.body.lastName, req.body.emailId, req.body.passingYear, req.body.branch, req.body.dob, req.body.gender, false);
        Conn = Student;
    } else {
        userDetails = formatClubDetails(req.body.name, req.body.emailId, req.body.clubType, false);
        Conn = Club;
    }
    await Conn.findByPk(userId).then(async(user) => {
        if (user == null) return next(new ErrorHandler(500, "Expected Key Not Found"));
        else {
            for (let [key, value] of Object.entries(userDetails))
                if (user[key]) user[key] = value;
            await user.save();
        }
    });
    res.status(200).json({ success: true, message: "User Details Updated" });
});

//Function that deletes current user details
exports.deleteUser = catchAsyncErrors(async(req, res, next) => {
    const userId = req.session.userId;
    await User.destroy({ where: { userId: userId } }); // Delete user data
    await Session.destroy({ where: { userId: userId } }); // Delete all sessions of user
    res.status(200).json({ success: true, message: "User Deleted" });
});

//Function to update profilePic
exports.updateProfilePic = catchAsyncErrors(async(req, res, next) => {
    const userId = req.session.userId;
    const userType = req.session.userType;
    let Conn;
    if (userType == "STUDENT")
        Conn = Student;
    else
        Conn = Club;
    console.log(req.file);
    if (req.file) {
        let user = await Conn.findByPk(userId);
        user.profilePic = req.file.filename;
        await user.save();
    } else
        return next(new ErrorHandler(400, "Profile Pic is required"));

    res.status(200).json({ success: true, message: "Profile Pic Updated" });
});