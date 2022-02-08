const Flash = require("../utils/Flash");
const Post = require("../models/Post.model");

exports.explorerGetController = async (req, res, next) => {
	try {
		let posts = await Post.find();
		res.render("pages/explorer/explorer", {
			title: "Explore Posts",
			filter: "latest",
			error: {},
			flashMessage: Flash.getMessage(req),
            posts
		});
	} catch (err) {
		next(err);
	}
};
