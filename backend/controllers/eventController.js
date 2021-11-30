const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Event = require("../models/event");
const ErrorHandler = require("../utils/errorHandler");
const { formatEventDetails } = require("../utils/eventUtils");

exports.addEvent = catchAsyncErrors(async(req, res, next) => {
    console.log(req.body);
    let event = formatEventDetails(req.body.eventName, req.body.eventTime);
    event.creatorId = req.session.userId;
    console.log(event);
    await Event.create(event);
    res.status(200).json({
        message: "Event added successfully"
    });
});

exports.getEvents = catchAsyncErrors(async(req, res, next) => {
    const queryOptions = {};
    if (req.query.userId)
        queryOptions.where = { creatorId: parseInt(req.query.userId) };
    if (req.query.perPage) {
        queryOptions.limit = parseInt(req.query.perPage);
        if (req.query.page) {
            let page = parseInt(req.query.page);
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