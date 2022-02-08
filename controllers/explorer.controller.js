const Flash = require("../utils/Flash");

exports.explorerGetController = (req, res, next) => {
	res.render("pages/explorer/explorer", {
		title: "Explore Posts",
		filter: "latest",
		error: {},
		flashMessage: Flash.getMessage(req),
	});
};
