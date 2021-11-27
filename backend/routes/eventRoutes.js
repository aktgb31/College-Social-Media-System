const { addEvent, getEvents, deleteEvent } = require('../controllers/eventController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = require('express').Router();

router.post("/", isAuthenticatedUser, addEvent);
router.get("/", isAuthenticatedUser, getEvents);
router.delete("/", isAuthenticatedUser, deleteEvent);

module.exports = router;