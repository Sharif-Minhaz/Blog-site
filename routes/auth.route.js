const router = require("express").Router();
const {
	signupGetController,
	signupPostController,
	loginGetController,
	loginPostController,
	logoutController,
} = require("../controllers/auth.controller");
const signupValidator = require("../validator/auth/signup.validator");
const loginValidator = require("../validator/auth/login.validator");
// task
const { isUnAuthenticated } = require("../middlewares/auth.middleware");

router.get("/signup", isUnAuthenticated, signupGetController);
router.post("/signup", isUnAuthenticated, signupValidator, signupPostController);

router.get("/login", isUnAuthenticated, loginGetController);
router.post("/login", isUnAuthenticated, loginValidator, loginPostController);

router.get("/logout", logoutController);

module.exports = router;
