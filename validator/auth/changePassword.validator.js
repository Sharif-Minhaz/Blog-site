const { body } = require("express-validator");
const bcrypt = require("bcrypt");

module.exports = [
	body("oldPassword")
		.not()
		.isEmpty()
		.withMessage("Old password cannot be empty")
		.custom(async (oldPassword, { req }) => {
			let match = await bcrypt.compare(oldPassword, req.user.password);
			if (!match) {
				throw new Error("Old password doesn't matched");
			}
			return true;
		}),
	body("newPassword").not().isEmpty().withMessage("New Password cannot be empty"),
	body("newPassword")
		.isLength({ min: 5 })
		.withMessage("Password must be greater than 4 characters long"),
	body("confirmPassword")
		.isLength({ min: 5 })
		.withMessage("Password must be greater than 4 characters long")
		.custom((confirmPassword, { req }) => {
			if (confirmPassword !== req.body.newPassword) {
				throw new Error("Password doesn't matched");
			}
			return true;
		}),
];
