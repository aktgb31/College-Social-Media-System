const { addEvent } = require('../controllers/eventController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = require('express').Router();

router.post("/", isAuthenticatedUser, addEvent);
module.exports = router;