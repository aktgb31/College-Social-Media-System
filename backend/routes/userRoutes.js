const router = require("express").Router();
const {
  register,
  login,
  logout,
  changePassword,
  getUserDetails,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticatedUser, logout);
router.post("/password/change", isAuthenticatedUser, changePassword);
router.get("/view", isAuthenticatedUser, getUserDetails);
module.exports = router;
