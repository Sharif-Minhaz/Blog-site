exports.dashboardGetController = (req, res, next) => {
	res.render("pages/dashboard/dashboard", { title: "Blog | Dashboard" });
};
