const router = require("express").Router();
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
router.get("/create-profile", isAuthenticated, createProfilePostController);

router.get("/edit-profile", isAuthenticated, editProfileGetController);
router.post("/edit-profile", isAuthenticated, editProfilePostController);

module.exports = router;
