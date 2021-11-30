const { Op } = require("sequelize");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { Message } = require("../models/message");

exports.getMessage = (catchAsyncErrors(async(req, res, next) => {
    const queryOptions = {};
    const id1 = req.session.userId;
    const id2 = req.body.userId;
    queryOptions.where = {
        senderId: {
            [Op.or]: [id1, id2]
        },
        receiverId: {
            [Op.or]: [id1, id2]
        }
    };

    if (req.body.perPage) {
        queryOptions.limit = req.body.perPage;
        if (req.body.page) {
            let page = req.body.page;
            queryOptions.offset = (page - 1) * perPage;
        } else
            queryOptions.offset = 0;
    }

    queryOptions.order = ['createdAt', 'DESC'];

    const messages = await Message.findAll({ queryOptions });
    res.status(200).json({
        status: "success",
        data: {
            messages
        }
    });
}));

exports.sendMessage = catchAsyncErrors(async(req, res, next) => {
    const senderId = req.session.userId;
    const receiverId = req.body.receiverId;
    const hashedContent = req.body.content;

    const message = await Message.create({ senderId, receiverId, hashedContent });
    res.status(202).json({
        status: "success",
        message: "Message sent successfully"
    });
})