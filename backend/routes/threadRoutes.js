const { createThread, deleteThread, getAllThreads, getThreadById } = require('../controllers/threadController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = require('express').Router();

router.get('/', isAuthenticatedUser, getAllThreads);

router.get('/:threadId', isAuthenticatedUser, getThreadById);
router.post("/create", isAuthenticatedUser, createThread);

router.delete("/delete", isAuthenticatedUser, deleteThread);

module.exports = router;