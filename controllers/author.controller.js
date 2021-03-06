const User = require("../models/User.model");
const Flash = require("../utils/Flash");

exports.authorProfileGetController = async (req, res, next) => {
	let userId = req.params.user;

	try {
		let author = await User.findById(userId).populate({
			path: "profile",
			populate: {
				path: "posts",
			},
		});
		res.render("pages/explorer/author", {
			title: "Author Profile",
			flashMessage: Flash.getMessage(req),
			author,
		});
	} catch (err) {
		next(err);
	}
};
