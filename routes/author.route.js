const router = require("express").Router();
const { authorProfileGetController } = require("../controllers/author.controller");

router.get("/:user", authorProfileGetController);

module.exports = router;
