const router = require("express").Router();

const { isAuthenticated } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const {
	uploadProfilePics,
	removeProfilePics,
	postImageUploadController,
} = require("../controllers/upload.controller");

router.post("/profilePics", isAuthenticated, upload.single("profilePics"), uploadProfilePics);

router.delete("/profilePics", isAuthenticated, removeProfilePics);

router.post("/postimage", isAuthenticated, upload.single("post-image"), postImageUploadController);

module.exports = router;
