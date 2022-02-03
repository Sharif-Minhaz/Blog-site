const authRoute = require("./auth.route");
const dashboardRoute = require("./dashboard.route");

const routes = [
	{
		path: "/auth",
		handler: authRoute,
	},
	{
		path: "/dashboard",
		handler: dashboardRoute,
	},
	{
		path: "/",
		handler: (req, res) => {
			res.json({
				msg: "This is home page!",
			});
		},
	},
];

module.exports = (app) => {
	routes.forEach((r) => {
		(r.path === "/") ? app.get(r.path, r.handler) : app.use(r.path, r.handler);
	});
};
