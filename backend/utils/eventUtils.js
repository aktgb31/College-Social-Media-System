const ErrorHandler = require("./errorHandler");
const validator = require('validator');

exports.formatEventDetails = (name, time) => {
    if (name == null || name == "")
        throw new ErrorHandler(400, "Event Name cannot be empty");
    if (!validator.isISO8601(time))
        throw new ErrorHandler(400, "Event Time is not in ISO8601 format");
    let event = {};
    event.name = name.toUpperCase();
    event.time = time;
    return event;
};