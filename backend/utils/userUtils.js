const ErrorHandler = require("./errorHandler");
const validator = require("validator");

exports.formatStudentDetails = (firstName, lastName, emailId, passingYear, branch, dob, gender, createMode = true) => {
    if (firstName == null || firstName == "")
        throw new ErrorHandler(400, "First name is required");
    if (lastName == null || lastName == "")
        throw new ErrorHandler(400, "Last name is required");
    if (createMode) {
        if (emailId == null || emailId == "")
            throw new ErrorHandler(400, "EmailId is required");
        if (!validator.isEmail(emailId))
            throw new ErrorHandler(400, "Invalid emailId");
        if (emailId.slice(-11) != "@nitc.ac.in")
            throw new ErrorHandler(400, "Only nitc emailIds are allowed");
    }
    if (passingYear == null || passingYear == "")
        throw new ErrorHandler(400, "Passing year is required");
    if (branch == null || branch == "")
        throw new ErrorHandler(400, "Branch is required");
    if (dob == null || dob == "")
        throw new ErrorHandler(400, "Date of birth is required");
    if (!validator.isISO8601(dob, { strict: true }))
        throw new ErrorHandler(400, "Invalid date of birth");
    if (gender == null || gender == "")
        throw new ErrorHandler(400, "Gender is Required");

    let student = {};
    student.firstName = firstName.toUpperCase();
    student.lastName = lastName.toUpperCase();
    if (createMode)
        student.emailId = emailId.toLowerCase();
    student.gender = gender.toUpperCase();
    if (student.gender != "MALE" && student.gender != "FEMALE")
        throw new ErrorHandler(400, "Invalid Gender. Allowed Values =\"MALE\",\"FEMALE\"");
    student.passingYear = passingYear;
    student.branch = branch.toUpperCase();
    student.dob = dob;
    if (student.gender == "MALE")
        student.profilePic = "MALE.PNG";
    else
        student.profilePic = "FEMALE.PNG";
    return student;
};

exports.formatClubDetails = (name, emailId, clubType, createMode = true) => {
    if (name == null || name == "")
        throw new ErrorHandler("404", "Club name is required");
    if (clubType == null || clubType == "")
        throw new ErrorHandler("404", "Club type is required");
    if (createMode) {
        if (emailId == null || emailId == "")
            throw new ErrorHandler(400, "EmailId is required");
        if (!validator.isEmail(emailId))
            throw new ErrorHandler(400, "Invalid emailId");
        if (emailId.slice(-11) != "@nitc.ac.in")
            throw new ErrorHandler(400, "Only nitc emailIds are allowed");
    }
    let club = {};
    club.name = name.toUpperCase();
    if (createMode)
        club.emailId = emailId.toLowerCase();
    club.clubType = clubType.toUpperCase();
    return club;
};