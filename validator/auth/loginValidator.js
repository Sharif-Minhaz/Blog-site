const { body } = require("express-validator");

module.exports = [
	body("email").not().isEmpty().withMessage("Email cannot be empty"),
	body("password").not().isEmpty().withMessage("Password cannot be empty"),
];
