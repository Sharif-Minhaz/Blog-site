const router = require("express").Router();
const { isAuthenticated } = require("../../middlewares/auth.middleware");
const {
	createCommentController,
	replyCommentPostController,
} = require("../controllers/comment.controller");
const {
	likeGetController,
	dislikeGetController,
} = require("../controllers/likeDislike.controller");
const { bookmarksGetController } = require("../controllers/bookmarks.controller");

router.post("/comments/:postId", isAuthenticated, createCommentController);
router.post("/comments/replies/:commentId", isAuthenticated, replyCommentPostController);

router.get("/likes/:postId", isAuthenticated, likeGetController);
router.get("/dislikes/:postId", isAuthenticated, dislikeGetController);

router.get("/bookmarks/:postId", isAuthenticated, bookmarksGetController);

module.exports = router;
