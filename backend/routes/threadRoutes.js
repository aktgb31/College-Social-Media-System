const { createThread, deleteThread, getAllThreads, getThreadById } = require('../controllers/threadController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = require('express').Router();

router.get('/', isAuthenticatedUser, getAllThreads);

router.post("/", isAuthenticatedUser, createThread);

router.delete("/", isAuthenticatedUser, deleteThread);

module.exports = router;