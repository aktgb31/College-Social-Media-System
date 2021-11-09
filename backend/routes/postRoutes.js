const { getPosts, addPost, deletePost } = require('../controllers/postController');
const { isAuthenticatedUser } = require('../middlewares/auth');
const router = require('express').Router();

router.get("/", isAuthenticatedUser, getPosts);

router.post("/", isAuthenticatedUser, addPost);

router.delete("/:postId", isAuthenticatedUser, deletePost);

module.exports = router;