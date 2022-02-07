const router = require("express").Router();

const postValidator = require("../validator/dashboard/post/post.validator");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const {
	createPostGetController,
	createPostPostController,
	editPostGetController,
	editPostPostController,
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

router.post(
	"/edit/:postId",
	isAuthenticated,
	upload.single("post-thumbnail"),
	postValidator,
	editPostPostController
);

module.exports = router;
