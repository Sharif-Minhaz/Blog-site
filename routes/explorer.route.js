const router = require("express").Router();
const { explorerGetController, singlePageGetController } = require("../controllers/explorer.controller");

router.get("/", explorerGetController);

router.get("/:postId", singlePageGetController)

module.exports = router;