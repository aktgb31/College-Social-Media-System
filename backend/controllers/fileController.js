const multer = require("multer");
const ErrorHandler = require("../utils/errorHandler");
const path = require("path");
const fs = require("fs");
const { randomInt } = require("crypto");

function imageFilter(req, file, cb) {
    let filetypes = /jpeg|jpg|png/;
    let mimetype = filetypes.test(file.mimetype);
    let extname = filetypes.test(path.extname(
        file.originalname).toLowerCase());
    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new ErrorHandler(400, "File upload only supports the following filetypes - " + filetypes));
}

const storageProfilePic = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads")
    },
    filename: function(req, file, cb) {
        cb(null, "profile" + req.session.userId + ".jpeg")
    }
})

const storagePostPic = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads")
    },
    filename: function(req, file, cb) {
        cb(null, "post" + req.session.userId + Date.now() + randomInt(1000000000) + ".jpeg")
    }
})

// Maximum 5mb image
const maxSize = 5 * 1000 * 1000;

exports.uploadProfilePic = multer({
    storage: storageProfilePic,
    limits: { fileSize: maxSize },
    fileFilter: imageFilter
}).single("profilePic");

exports.uploadPostPic = multer({
    storage: storagePostPic,
    limits: { fileSize: maxSize },
    fileFilter: imageFilter
}).single("relatedImage");

exports.deleteImage = (source) => {
    fs.unlink(source, (err) => { if (err) console.log(err.message) });
};