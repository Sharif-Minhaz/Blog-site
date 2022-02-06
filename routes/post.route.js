const router = require("express").Router();

const postValidator = require("../validator/dashboard/post/post.validator");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware")

const {
	createPostGetController,
	createPostPostController,
} = require("../controllers/post.controller");

router.get("/create", isAuthenticated, createPostGetController);

router.post("/create", isAuthenticated, upload.single("post-thumbnail"), postValidator, createPostPostController);

module.exports = router;
