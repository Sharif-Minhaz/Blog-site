const authRoute = require("./auth.route");
const dashboardRoute = require("./dashboard.route");
const uploadRoute = require("./upload.route");
const postRoute = require("./post.route");
const homeRoute = require("./home.route");
const apiRoute = require("../api/routes/api.route");
const explorerRoute = require("./explorer.route");

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
		path: "/uploads",
		handler: uploadRoute,
	},
	{
		path: "/posts",
		handler: postRoute,
	},
	{
		path: "/api",
		handler: apiRoute,
	},
	{
		path: "/explorer",
		handler: explorerRoute,
	},
	{
		path: "/",
		handler: homeRoute,
	},
];

module.exports = (app) => {
	routes.forEach((r) => {
		r.path === "/" ? app.get(r.path, r.handler) : app.use(r.path, r.handler);
	});
};
