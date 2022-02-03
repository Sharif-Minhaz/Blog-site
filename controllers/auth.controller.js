const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const errorFormatter = require("../utils/validationErrorFormatter");
const Flash = require("../utils/Flash");

exports.signupGetController = (req, res, next) => {
	res.render("pages/auth/signup", { title: "Blog | Signup", error: {}, value: {}, flashMessage: Flash.getMessage(req) });
};

exports.signupPostController = async (req, res, next) => {
	let { username, email, password } = req.body;
	let errors = validationResult(req).formatWith(errorFormatter);

	if (!errors.isEmpty()) {
		req.flash("fail", "Please Check the fields");
		res.render("pages/auth/signup", { title: "Blog | Signup", error: errors.mapped(), value: req.body, flashMessage: Flash.getMessage(req) });
	} else {
		try {
			let hashedPassword = await bcrypt.hash(password, 10);

			let user = new User({
				username,
				email,
				password: hashedPassword,
			});

			await user.save();
			req.flash("success", "User created successfully.");
			res.redirect("/auth/login");
		} catch (err) {
			next(err);
		}
	}
};

exports.loginGetController = async (req, res, next) => {
	res.render("pages/auth/login", { title: "Blog | Login", error: {}, value: {}, flashMessage: Flash.getMessage(req) });
};
exports.loginPostController = async (req, res, next) => {
	let { email, password } = req.body;

	let errors = validationResult(req).formatWith(errorFormatter);
	if (!errors.isEmpty()) {
		req.flash("fail", "Please Check your information");
		res.render("pages/auth/login", { title: "Blog | Login", error: errors.mapped(), value: req.body, flashMessage: Flash.getMessage(req) });
	} else {
		try {
			let user = await User.findOne({ email });
			if (!user) {
				req.flash("fail", "Please provide valid credentials");
				res.render("pages/auth/login", {
					title: "Blog | Login",
					error: { authErr: true },
					value: req.body,
					flashMessage: Flash.getMessage(req),
				});
			} else {
				let match = await bcrypt.compare(password, user.password);

				if (!match) {
					req.flash("fail", "Please provide valid credentials");
					res.render("pages/auth/login", {
						title: "Blog | Login",
						error: { authErr: true },
						value: req.body,
						flashMessage: Flash.getMessage(req),
					});
				} else {
					req.session.isLoggedIn = true;
					req.session.user = user;
					req.session.save((err) => {
						if (err) {
							next(err);
						} else {
							req.flash("success", "Successfully logged in.")
							res.redirect("/dashboard");
						}
					});
				}
			}
		} catch (err) {
			next(err);
		}
	}
};

exports.logoutController = (req, res, next) => {
	req.flash("success", "Successfully sign out");
	req.session.destroy((err) => {
		if (err) {
			next(err);
		} else {
			res.redirect("/");
		}
	});
};
