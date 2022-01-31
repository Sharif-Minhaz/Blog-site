const { body } = require("express-validator");
const User = require("../../models/User.model");

module.exports = [
	body("username")
		.isLength({ min: 2, max: 15 })
		.withMessage("Username must be between 2 to 15 characters")
		.custom(async (username) => {
			let user = await User.findOne({ username });
			if (user) {
				return Promise.reject("username already used");
			}
		})
		.trim(),
	body("email")
		.isEmail()
		.withMessage("Please provide a valid email")
		.custom(async (email) => {
			let user = await User.findOne({ email });
			if (user) {
				return Promise.reject("email already in use");
			}
		})
		.normalizeEmail(),
	body("password").isLength({ min: 5 }).withMessage("Password must be greater than 4 characters long"),
	body("confirmPassword")
		.isLength({ min: 5 })
		.withMessage("Password must be greater than 4 characters long")
		.custom((confirmPassword, { req }) => {
			if (confirmPassword !== req.body.password) {
				throw new Error("Password doesn't matched");
				// return Promise.reject("Password doesn't matched");
			}
			return true;
		}),
];
