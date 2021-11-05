const router = require("express").Router();
const {
    register,
    login,
    logout,
    changePassword,
    getUserDetails,
    updateUserDetails,
    registerStudent,
    registerClub,
    deleteUser,
} = require("../controllers/userController");

const { isAuthenticatedUser, isLoginedUser } = require("../middlewares/auth");

router.post("/register/student", isLoginedUser, registerStudent);

router.post("/register/club", isLoginedUser, registerClub);

router.post("/login", isLoginedUser, login);

router.post("/logout", isAuthenticatedUser, logout);

router.put("/password/change", isAuthenticatedUser, changePassword);

router.post("/password/forgot", isLoginedUser, changePassword);

router.get("/profile", isAuthenticatedUser, getUserDetails);

router.put("/profile/update", isAuthenticatedUser, updateUserDetails);

router.delete("/profile/delete", isAuthenticatedUser, deleteUser);

module.exports = router;