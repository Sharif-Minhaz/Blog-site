const router = require("express").Router();
const {
	signupGetController,
	signupPostController,
	loginGetController,
	loginPostController,
	logoutController,
	changePasswordGetController,
	changePasswordPostController,
} = require("../controllers/auth.controller");
const signupValidator = require("../validator/auth/signup.validator");
const loginValidator = require("../validator/auth/login.validator");
const changePasswordValidator = require("../validator/auth/changePassword.validator")
// task
const { isUnAuthenticated, isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/signup", isUnAuthenticated, signupGetController);
router.post("/signup", isUnAuthenticated, signupValidator, signupPostController);

router.get("/login", isUnAuthenticated, loginGetController);
router.post("/login", isUnAuthenticated, loginValidator, loginPostController);

router.get("/changePassword", isAuthenticated, changePasswordGetController)
router.post("/changePassword", isAuthenticated,changePasswordValidator, changePasswordPostController);

router.get("/logout", logoutController);

module.exports = router;
