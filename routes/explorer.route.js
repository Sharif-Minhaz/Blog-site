const router = require("express").Router();
const { explorerGetController } = require("../controllers/explorer.controller");

router.get("/", explorerGetController);

module.exports = router;