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

    if (req.body.threadId) {
        queryOptions.where.threadId = req.body.threadId;
        queryOptions.where.include = [];
        queryOptions.where.include.push({ model: Post, as: 'Posts', raw: true });
    }

    if (req.body.userId)
        queryOptions.where.creatorId = req.body.userId;

    queryOptions.order = [
        ['createdAt', 'DESC']
    ];

    if (req.body.perPage) {
        queryOptions.limit = req.body.perPage;
        if (req.body.page) {
            let page = req.body.page;
            queryOptions.offset = (page - 1) * perPage;
        } else
            queryOptions.offset = 0;
    }

    queryOptions.nest = true;
    queryOptions.raw = true;

    const threads = await Thread.findAll({ queryOptions });
    if (threads.length === 0 && req.body.threadId) { return next(new ErrorHandler(404, "No thread found with given ID")); }

    res.status(200).json({ status: "success", data: threads });
});


exports.deleteThread = catchAsyncErrors(async(req, res, next) => {

    const threadId = req.body.threadId;
    if (threadId == null)
        return next(new ErrorHandler(400, "Thread Id is required"));
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