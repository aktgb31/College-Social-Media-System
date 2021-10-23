const router = require("express").Router();
const {
  register,
  login,
  logout,
  changePassword,
  getUserDetails,
  updateUserDetails,
} = require("../controllers/userController");
const { isAuthenticatedUser, isLoginedUser } = require("../middlewares/auth");

router.post("/register", isLoginedUser, register);
router.post("/login", isLoginedUser, login);
router.post("/logout", isAuthenticatedUser, logout);
router.post("/password/change", isAuthenticatedUser, changePassword);
router.get("/profile", isAuthenticatedUser, getUserDetails);
router.post("/profile/update", isAuthenticatedUser, updateUserDetails);
module.exports = router;
