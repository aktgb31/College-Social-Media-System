const { getMessage, sendMessage } = require('../controllers/messageController');

const router = require('express').Router();

router.get('/', getMessage);

router.post('/', sendMessage);

module.exports = router;