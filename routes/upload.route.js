const router = require("express").Router();

const { isAuthenticated } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const { uploadProfilePics, removeProfilePics } = require("../controllers/upload.controller");

router.post("/profilePics", isAuthenticated, upload.single("profilePics"), uploadProfilePics);

router.delete("/profilePics", isAuthenticated, removeProfilePics);

module.exports = router;
