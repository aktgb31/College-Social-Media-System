const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
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

exports.getAllThreads = catchAsyncErrors(async(req, res, next) => {
    const threads = await Thread.findAll({ raw: true });
    res.status(200).json({ status: "success", data: threads });
});

exports.getThreadById = catchAsyncErrors(async(req, res, next) => {
    const threadId = parseInt(req.params.threadId);
    const thread = await Thread.findOne({
        where: {
            threadId: threadId
        },
        raw: true
    });
    if (!thread) {
        return next(new ErrorHandler("No thread found with given ID", 404));
    }
    res.status(200).json({ status: "success", thread: formatThreadDetails(thread) });
});

exports.addPostToThread = catchAsyncErrors(async(req, res, next) => {
    const threadId = parseInt(req.params.threadId)
});
exports.deleteThread = catchAsyncErrors(async(req, res, next) => {

    const threadId = req.params.threadId;
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