const nodemailer = require("nodemailer");
const { EMAIL, ENVIRONMENT } = require("../config");

const verificationSubject = "College Social Media System Account Verification";

function verificationHTML(to, password) {
    return `<p>Your account on College Social Media System has been created sucessfully. Use following details to sign in.<br>User_ID : ${to}<br>Password : ${password}</p>`;
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL.user,
        pass: EMAIL.password,
    },
});

exports.emailService = transporter;

async function sendVerificationEmail(to, password) {
    if (ENVIRONMENT == "development") {
        console.log(`User_ID : ${to} , Password : ${password}`);
        return;
    }
    const mailOptions = {
        from: {
            name: "College Social media System",
            address: "armdihtk@gmail.com",
        },
        to: to,
        subject: verificationSubject,
        html: verificationHTML(to, password),
    };
    await transporter.sendMail(mailOptions);
}

exports.sendVerificationEmail = sendVerificationEmail;