const router = require("express").Router();

const { registerUser } = require("../controllers/userController")

router.post("/register", registerUser);
module.exports = router;
