const router = require("express").Router();
const {
    login,
    logout,
    changePassword,
    getUserDetails,
    updateUserDetails,
    registerStudent,
    registerClub,
    deleteUser,
    forgotPassword,
    getAllStudents,
    getAllClubs,
    getMyDetails,
    getAllUsers,
} = require("../controllers/userController");

const { isAuthenticatedUser, isLoginedUser } = require("../middlewares/auth");

router.get("/", isAuthenticatedUser, getAllUsers);

router.get("/students", isAuthenticatedUser, getAllStudents);

router.get("/clubs", isAuthenticatedUser, getAllClubs);

router.post("/register/student", isLoginedUser, registerStudent);

router.post("/register/club", isLoginedUser, registerClub);

router.post("/login", isLoginedUser, login);

router.post("/logout", isAuthenticatedUser, logout);

router.put("/password/change", isAuthenticatedUser, changePassword);

router.post("/password/forgot", isLoginedUser, forgotPassword);

router.get("/profile/me", isAuthenticatedUser, getMyDetails);

router.get("/profile/", isAuthenticatedUser, getUserDetails);

router.put("/profile/update", isAuthenticatedUser, updateUserDetails);

router.delete("/delete", isAuthenticatedUser, deleteUser);

module.exports = router;