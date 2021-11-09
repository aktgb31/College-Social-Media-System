const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { Message } = require("../models/message");

exports.getMessage = (catchAsyncErrors(async(req, res, next) => {
    const messages = await Message.findAll({});
    res.status(200).json({
        status: "success",
        data: {
            messages
        }
    });
}));

exports.sendMessage = catchAsyncErrors(async(req, res, next) => {
    res.status(202).json({
        status: "success",
        message: "Message sent successfully"
    });
})