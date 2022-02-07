const router = require("express").Router();

const postValidator = require("../validator/dashboard/post/post.validator");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const { editPostGetController } = require("../controllers/post.controller");

const {
	createPostGetController,
	createPostPostController,
} = require("../controllers/post.controller");

router.get("/create", isAuthenticated, createPostGetController);

router.post(
	"/create",
	isAuthenticated,
	upload.single("post-thumbnail"),
	postValidator,
	createPostPostController
);

router.get("/edit/:postId", isAuthenticated, editPostGetController);

module.exports = router;
