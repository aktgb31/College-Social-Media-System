const Db = require("../config/database");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Event = require("../models/event");
const { Student } = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const { formatEventDetails } = require("../utils/eventUtils");

exports.addEvent = catchAsyncErrors(async(req, res, next) => {
    let event = formatEventDetails(req.body.eventName, req.body.eventTime);
    event.creatorId = req.session.userId;
    await Event.create(event);
    res.status(200).json({
        message: "Event added successfully"
    });
});

exports.getEvents = catchAsyncErrors(async(req, res, next) => {
    const queryOptions = {};
    if (req.query.creatorId)
        queryOptions.where = { creatorId: parseInt(req.query.creatorId) };
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
    let event = await Event.findByPk(parseInt(req.query.eventId));
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

// const addBirthday = async() => {
//     const currentTime=new Date();
//     const nextTime=new Date(Date.now()+)
//     const birthdays=Student.findAll({where:Db.where(Db.fn)})

// };

const deleteOldEvents = async() => {
    const lastDate = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
    await Event.destroy({
        where: {
            eventTime: {
                [Op.lt]: lastDate
            }
        }
    }).catch(err => { console.log(err.message) });
};

let cron = setInterval(deleteOldEvents, 15 * 60 * 1000);