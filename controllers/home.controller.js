exports.getHomePage = (req, res) => {
	res.render("pages/home", { title: "Home", error: {}, flashMessage: {} });
};
