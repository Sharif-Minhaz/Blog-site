exports.getHomePage = (req, res) => {
	res.render("pages/home", { title: "Blog Site", error: {}, flashMessage: {} });
};
