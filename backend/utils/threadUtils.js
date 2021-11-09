const ErrorHandler = require("./errorHandler")

exports.formatThreadDetails = (title) => {
    if (title == null || title == "")
        return new ErrorHandler(400, "Title is required");
    let thread = {};
    thread.threadTitle = title;
    return thread;
}