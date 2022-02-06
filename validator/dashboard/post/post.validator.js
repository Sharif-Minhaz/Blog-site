const { body } = require("express-validator");
const cheerio = require("cheerio");

module.exports = [
	body("title")
		.not()
		.isEmpty()
		.withMessage("Title cannot be empty")
		.isLength({ max: 100 })
		.withMessage("Title con't be greater than 100 characters")
		.trim(),
	body("body")
		.not()
		.isEmpty()
		.withMessage("Body cannot be empty")
		.custom((value) => {
			let $ = cheerio.load(value);
			let text = $.text();
			if (text.length >= 5000) {
				throw new Error("Body cannot be greater than 5000 characters");
			}
			return true;
		}),
	body("tags").not().isEmpty().withMessage("Tags cannot be empty"),
];
