exports.signupGetController = (req, res, next) => {
	res.render("pages/auth/signup", { title: "Blog | Signup" });
};

exports.signupPostController = (req, res, next) => {};

exports.loginGetController = (req, res, next) => {};
exports.loginPostController = (req, res, next) => {};

exports.logoutController = (req, res, next) => {};
