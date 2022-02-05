const Flash = require("../utils/Flash");

exports.createPostGetController = (req, res, next) => {
	res.render("pages/dashboard/post/createPost", {
		title: "Create a New Post",
		error: {},
		flashMessage: Flash.getMessage(req),
	});
};

exports.createPostPostController = (req, res, next) => {
    res.render("pages/dashboard/post/createPost", {
		title: "Create a New Post",
		error: {},
		flashMessage: Flash.getMessage(req),
	});
};
