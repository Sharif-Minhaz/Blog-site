const router = require("express").Router();
const profileValidator = require("../validator/dashboard/profile.validator");
const {
	dashboardGetController,
	createProfileGetController,
	createProfilePostController,
	editProfileGetController,
	editProfilePostController,
} = require("../controllers/dashboard.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/", isAuthenticated, dashboardGetController);

router.get("/create-profile", isAuthenticated, createProfileGetController);
router.post("/create-profile", isAuthenticated, profileValidator, createProfilePostController);

router.get("/edit-profile", isAuthenticated, editProfileGetController);
router.post("/edit-profile", isAuthenticated, editProfilePostController);

module.exports = router;
