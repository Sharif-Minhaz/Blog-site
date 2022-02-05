const router = require("express").Router();

const {
	createPostGetController,
	createPostPostController,
} = require("../controllers/post.controller");

router.get("/create", createPostGetController);

router.post("/create", createPostPostController);

module.exports = router;
