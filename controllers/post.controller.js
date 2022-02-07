const Flash = require("../utils/Flash");
const readingTime = require("reading-time");
const { validationResult } = require("express-validator");
const errorFormatter = require("../utils/validationErrorFormatter");
const Post = require("../models/Post.model");
const Profile = require("../models/Profile.model");

exports.createPostGetController = (req, res, next) => {
	res.render("pages/dashboard/post/createPost", {
		title: "Create a New Post",
		error: {},
		flashMessage: Flash.getMessage(req),
		value: {},
	});
};

exports.createPostPostController = async (req, res, next) => {
	let errors = validationResult(req).formatWith(errorFormatter);
	let { title, body, tags } = req.body;

	if (!errors.isEmpty()) {
		return res.render("pages/dashboard/post/createPost", {
			title: "Create a New Post",
			error: errors.mapped(),
			flashMessage: Flash.getMessage(req),
			value: {
				title,
				body,
				tags,
			},
		});
	}

	if (tags) {
		tags = tags.split(",");
		tags = tags.map((value) => value.trim());
	}

	let readTime = readingTime(body).text;

	let post = new Post({
		title,
		body,
		tags,
		author: req.user._id,
		thumbnail: "",
		readTime,
		likes: [],
		dislikes: [],
		comments: [],
	});

	if (req.file) {
		post.thumbnail = `/uploads/${req.file.filename}`;
	}

	try {
		let createdPost = await post.save();
		await Profile.findOneAndUpdate(
			{ user: req.user._id },
			{ $push: { posts: createdPost._id } }
		);
		req.flash("success", "Post created successfully");
		return res.redirect(`/posts/edit/${createdPost._id}`);
	} catch (err) {
		next(err);
	}
};

exports.editPostGetController = async (req, res, next) => {
	let postId = req.params.postId;
	try {
		let post = await Post.findOne({ author: req.user._id, _id: postId });
		if (!post) {
			let error = new Error("404 page not found");
			error.status = 404;
			throw new error();
		}
		res.render("pages/dashboard/post/editPost", {
			title: "Edit Post",
			error: {},
			flashMessage: Flash.getMessage(req),
			post,
		});
	} catch (err) {
		next(err);
	}
};

exports.editPostPostController = async (req, res, next) => {
	let { title, body, tags } = req.body;
	let postId = req.params.postId;
	let errors = validationResult(req).formatWith(errorFormatter);

	try {
		let post = await Post.findOne({ author: req.user._id, _id: postId });
		if (!post) {
			let error = new Error("404 page not found");
			error.status = 404;
			throw new error();
		}

		if (!errors.isEmpty()) {
			return res.render("pages/dashboard/post/editPost", {
				title: "Create a New Post",
				error: errors.mapped(),
				flashMessage: Flash.getMessage(req),
				post,
			});
		}

		if (tags) {
			tags = tags.split(",");
			tags = tags.map((value) => value.trim());
		}

		let thumbnail = post.thumbnail;
		if (req.file) {
			thumbnail = `/uploads/${req.file.filename}`;
		}

		await Post.findOneAndUpdate(
			{ _id: post._id },
			{ $set: { title, body, tags, thumbnail } },
			{ new: true }
		);

		req.flash("success", "Post updated successfully");
		res.redirect(`/posts/edit/${post._id}`);
	} catch (err) {
		next(err);
	}
};
