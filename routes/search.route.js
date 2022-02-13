const router = require("express").Router();

const { searchResultGetController } = require("../controllers/search.controller");

router.get("/", searchResultGetController);

module.exports = router;
