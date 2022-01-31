const router = require("express").Router();
const { dashboardGetController } = require("../controllers/dashboard.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/", isAuthenticated, dashboardGetController);

module.exports = router;
