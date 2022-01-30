const User = require("../models/User.model");
const bcrypt = require("bcrypt");

exports.signupGetController = (req, res, next) => {
	res.render("pages/auth/signup", { title: "Blog | Signup" });
};

exports.signupPostController = async (req, res, next) => {
	let { username, email, password } = req.body;

	try {
		let hashedPassword = await bcrypt.hash(password, 10);

		let user = new User({
			username,
			email,
			password: hashedPassword,
		});
        
		let createdUser = await user.save();
		// res.redirect("/auth/login")
		res.render("pages/auth/signup", { title: "Blog | Signup" });
	} catch (err) {
		console.error(err);
		next(err);
	}
};

exports.loginGetController = (req, res, next) => {};
exports.loginPostController = (req, res, next) => {};

exports.logoutController = (req, res, next) => {};
