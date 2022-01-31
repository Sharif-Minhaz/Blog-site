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
const { ifAuthenticated } = require("../middlewares/auth.middleware");

router.get("/signup", ifAuthenticated, signupGetController); // task
router.post("/signup", signupValidator, signupPostController); // task

router.get("/login", ifAuthenticated, loginGetController);
router.post("/login", loginValidator, loginPostController);

router.get("/logout", logoutController);

module.exports = router;
