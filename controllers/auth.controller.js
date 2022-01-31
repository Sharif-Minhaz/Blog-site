const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const errorFormatter = require("../utils/validationErrorFormatter");

exports.signupGetController = (req, res, next) => {
	res.render("pages/auth/signup", { title: "Blog | Signup", error: {}, value: {} });
};

exports.signupPostController = async (req, res, next) => {
	let { username, email, password } = req.body;
	let errors = validationResult(req).formatWith(errorFormatter);

	if (!errors.isEmpty()) {
		// return console.log(errors.mapped());
		return res.render("pages/auth/signup", { title: "Blog | Signup", error: errors.mapped(), value: req.body });
	}

	try {
		let hashedPassword = await bcrypt.hash(password, 10);

		let user = new User({
			username,
			email,
			password: hashedPassword,
		});

		let createdUser = await user.save();
		// res.redirect("/auth/login")
		res.render("pages/auth/signup", { title: "Blog | Signup", error:{}, value: {} });
	} catch (err) {
		console.error(err);
		next(err);
	}
};

exports.loginGetController = async (req, res, next) => {
	res.render("pages/auth/login", { title: "Blog | Login" });
};
exports.loginPostController = async (req, res, next) => {
	let { email, password } = req.body;

	try {
		let user = await User.findOne({ email });
		if (!user) {
			res.send("not found");
		} else {
			let match = await bcrypt.compare(password, user.password);
			if (!match) {
				res.json({
					msg: "wrong username or password",
				});
			} else {
				res.json(user);
			}
		}
	} catch (err) {
		console.log(err);
		next(err);
	}
};

exports.logoutController = (req, res, next) => {};
