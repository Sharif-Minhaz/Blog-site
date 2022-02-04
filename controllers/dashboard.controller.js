const { validationResult } = require("express-validator");
const Flash = require("../utils/Flash");
const Profile = require("../models/Profile.model");
const User = require("../models/User.model");
const errorFormatter = require("../utils/validationErrorFormatter");

exports.dashboardGetController = async (req, res, next) => {
	try {
		let profile = await Profile.findOne({ user: req.user._id });
		if (profile) {
			return res.render("pages/dashboard/dashboard", {
				title: "Blog | Dashboard",
				flashMessage: Flash.getMessage(req),
			});
		}
		res.redirect("/dashboard/create-profile");
	} catch (err) {
		next(err);
	}
};

exports.createProfileGetController = async (req, res, next) => {
	try {
		let profile = await Profile.findOne({ user: req.user._id });
		if (profile) {
			return res.redirect("/dashboard/edit-profile");
		}
		res.render("pages/dashboard/create-profile", {
			title: "Create profile",
			error: {},
			flashMessage: Flash.getMessage(req),
		});
	} catch (err) {
		next(err);
	}
};

exports.createProfilePostController = async (req, res, next) => {
	let errors = validationResult(req).formatWith(errorFormatter);

	if (!errors.isEmpty()) {
		return res.render("pages/dashboard/create-profile", {
			title: "Create profile",
			error: errors.mapped(),
			flashMessage: Flash.getMessage(req),
		});
	}

	let { name, title, bio, website, twitter, facebook, github } = req.body;
	let profilePics = req.user.profilePics;

	try {
		let profile = new Profile({
			user: req.user._id,
			name,
			title,
			bio,
			profilePics,
			links: {
				website: website || "",
				facebook: facebook || "",
				twitter: twitter || "",
				github: github || "",
			},
			posts: [],
			bookmarks: [],
		});

		let createdProfile = await profile.save();
		await User.findOneAndUpdate(
			{ _id: req.user._id },
			{ $set: { profile: createdProfile._id } }
		);

		req.flash("success", "Profile created successfully");
		res.redirect("/dashboard");
	} catch (err) {
		next(err);
	}
};

exports.editProfileGetController = (req, res, next) => {
	next();
};

exports.editProfilePostController = (req, res, next) => {
	next();
};
