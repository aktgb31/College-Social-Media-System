const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { Post } = require("../models/post");
const { Thread } = require("../models/thread");
const ErrorHandler = require("../utils/errorHandler");
const { formatThreadDetails } = require("../utils/threadUtils");

exports.createThread = catchAsyncErrors(async(req, res, next) => {

    let thread = formatThreadDetails(req.body.threadTitle);
    thread.creatorId = req.session.userId
    await Thread.create(thread);
    res.status(201).json({
        status: "success",
        message: "Thread Created Successfully"
    });
});

exports.getThreads = catchAsyncErrors(async(req, res, next) => {
    const queryOptions = {};
    queryOptions.where = {};

    if (req.query.threadId) {
        queryOptions.where.threadId = parseInt(req.query.threadId);
        queryOptions.where.include = [];
        queryOptions.where.include.push({ model: Post, as: 'Posts', raw: true });
    }

    if (req.query.userId)
        queryOptions.where.creatorId = parseInt(req.query.userId);

    queryOptions.order = [
        ['createdAt', 'DESC']
    ];

    if (req.query.perPage) {
        queryOptions.limit = parseInt(req.query.perPage);
        if (req.query.page) {
            let page = parseInt(req.query.page);
            queryOptions.offset = (page - 1) * perPage;
        } else
            queryOptions.offset = 0;
    }

    queryOptions.nest = true;
    queryOptions.raw = true;

    const threads = await Thread.findAll({ queryOptions });
    if (threads.length === 0 && req.query.threadId) { return next(new ErrorHandler(404, "No thread found with given ID")); }

    res.status(200).json({ status: "success", data: threads });
});


exports.deleteThread = catchAsyncErrors(async(req, res, next) => {

    if (req.query.threadId == null)
        return next(new ErrorHandler(400, "Thread Id is required"));
    const threadId = parseInt(req.query.threadId);
    const thread = await Thread.findByPk(threadId);
    if (thread == null)
        return next(new ErrorHandler(404, "Invalid thread id"));
    else if (thread.creatorId != req.session.userId)
        return next(new ErrorHandler(403, "You are not authorized to delete this thread"));
    else
        await thread.destroy();

    res.status(201).json({
        status: "success",
        message: "Thread Deleted Successfully"
    });
});