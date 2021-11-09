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