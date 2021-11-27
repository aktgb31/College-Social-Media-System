const { getPost, addPost, deletePost, addComment, addReaction } = require('../controllers/postController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = require('express').Router();

router.get("/", isAuthenticatedUser, getPost);

router.post("/", isAuthenticatedUser, addPost);

router.delete("/", isAuthenticatedUser, deletePost);

router.post("/comment", isAuthenticatedUser, addComment);

router.post("/reaction", isAuthenticatedUser, addReaction);

module.exports = router;