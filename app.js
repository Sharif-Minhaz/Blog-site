const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
// dev dependencies
// const morgan = require("morgan");
const chalk = require("chalk");
// routes and middlewares
const setMiddlewares = require("./middlewares/middlewares");
const setRoutes = require("./routes/routes");

// views engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const { DB_ADMIN, DB_PASSWORD } = process.env;
const PORT = process.env.PORT || 8080;

// if (app.get("env").toLowerCase() === "development") {
// 	app.use(morgan("dev"));
// }

// using routes from routes directory
setMiddlewares(app);
setRoutes(app);

// error handler
app.use((req, res, next) => {
	let error = new Error("404 page not found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	console.error(chalk.red.inverse(error));
	if (error.status === 404) {
		return res.render("pages/error/404", { title: "404 page not found", flashMessage: {} });
	}
	res.render("pages/error/500", { title: "server error", flashMessage: {} });
});

mongoose
	.connect(
		`mongodb+srv://${DB_ADMIN}:${DB_PASSWORD}@cluster0.h9bja.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
		}
	)
	.then(() => {
		console.info(chalk.cyan("Connected to The Database"));
		app.listen(PORT, () => {
			console.log(chalk.magentaBright.bold(`Server running at http://localhost:${PORT}`));
		});
	})
	.catch((err) => console.error(err));
