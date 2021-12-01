const { getMessage, sendMessage } = require('../controllers/messageController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = require('express').Router();

router.get('/', isAuthenticatedUser, getMessage);

router.post('/', isAuthenticatedUser, sendMessage);

module.exports = router;