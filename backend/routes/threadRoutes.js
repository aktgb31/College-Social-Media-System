const { createThread, deleteThread, getThreads } = require('../controllers/threadController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = require('express').Router();

router.get('/', isAuthenticatedUser, getThreads);

router.post("/", isAuthenticatedUser, createThread);

router.delete("/", isAuthenticatedUser, deleteThread);

module.exports = router;