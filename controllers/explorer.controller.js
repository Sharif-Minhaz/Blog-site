const Flash = require("../utils/Flash");
const Post = require("../models/Post.model");
const moment = require("moment");

function genDate(days) {
	let date = moment().subtract(days, "days");
	return date.toDate();
}

function generateFilterObject(filter) {
	let filterObj = {};
	let order = 1;

	switch (filter) {
		case "week": {
			filterObj = {
				createdAt: {
					$gt: genDate(7),
				},
			};
			order = -1;
			break;
		}
		case "month": {
			filterObj = {
				createdAt: {
					$gt: genDate(30),
				},
			};
			order = -1;
			break;
		}
		case "all": {
			order = -1;
			break;
		}
	}

	return {
		filterObj,
		order,
	};
}

exports.explorerGetController = async (req, res, next) => {
	let filter = req.query.filter || "latest";
	let currentPage = Number(req.query.page) || 1;
	let itemPerPage = 10;
	let { order, filterObj } = generateFilterObject(filter.toLowerCase());

	try {
		let posts = await Post.find()
			.populate("author", "username")
			.sort(order === 1 ? "-createdAt" : "createdAt")
			.skip(itemPerPage * currentPage - itemPerPage)
			.limit(itemPerPage);

        let totalPost = await Post.countDocuments();
        let totalPage = totalPost / itemPerPage;

		res.render("pages/explorer/explorer", {
			title: "Explore Posts",
			filter,
			error: {},
			flashMessage: Flash.getMessage(req),
			posts,
            itemPerPage,
            currentPage,
            totalPage
		});
	} catch (err) {
		next(err);
	}
};
