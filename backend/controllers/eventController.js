const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Event = require("../models/event");
const ErrorHandler = require("../utils/errorHandler");
const { formatEventDetails } = require("../utils/eventUtils");

exports.addEvent = catchAsyncErrors(async(req, res, next) => {
    let event = formatEventDetails(req.body.eventName, req.body.eventDescription, req.body.eventTime);
    event.creatorId = req.session.userId;
    await Event.create(event);
    res.status(200).json({
        message: "Event added successfully"
    });
});

exports.getEvents = catchAsyncErrors(async(req, res, next) => {
    const queryOptions = {};
    if (req.body.userId)
        queryOptions.where = { creatorId: req.body.userId };
    if (req.body.perPage) {
        queryOptions.limit = req.body.perPage;
        if (req.body.page) {
            let page = req.body.page;
            queryOptions.offset = (page - 1) * perPage;
        } else
            queryOptions.offset = 0;
    }
    queryOptions.order = [
        ['eventTime', 'DESC']
    ];
    queryOptions.raw = true;
    const events = await Event.findAll(queryOptions);
    res.status(200).json({ success: true, data: events });
});

exports.deleteEvent = catchAsyncErrors(async(req, res, next) => {
    let event = await Event.findByPk(req.body.eventId);
    if (event) {
        if (event.creatorId === req.session.userId) {
            event.destroy();
        } else
            return next(new ErrorHandler(403, "You are not authorized to delete this event"));
    } else
        return next(new ErrorHandler(400, "Event not found"));
    res.status(200).json({
        message: "Event deleted successfully"
    });
});