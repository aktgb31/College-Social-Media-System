const { Op } = require("sequelize");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { Message } = require("../models/message");

exports.getMessage = (catchAsyncErrors(async(req, res, next) => {
    const queryOptions = {};
    const id1 = req.session.userId;
    const id2 = parseInt(req.query.userId);
    queryOptions.where = {
        [Op.or]: [{ senderId: id1, receiverId: id2 }, { receiverId: id1, senderId: id2 }]
    };

    if (req.query.perPage) {
        queryOptions.limit = parseInt(req.query.perPage);
        if (req.query.page) {
            let page = parseInt(req.query.page);
            queryOptions.offset = (page - 1) * perPage;
        } else
            queryOptions.offset = 0;
    }

    queryOptions.order = [
        ['createdAt', 'DESC']
    ];

    const messages = await Message.findAll(queryOptions);
    res.status(200).json({
        status: "success",
        data: messages
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