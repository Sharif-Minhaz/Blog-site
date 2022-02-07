const router = require("express").Router();
const { getHomePage } = require("../controllers/home.controller");

router.get("/", getHomePage);

module.exports = router;