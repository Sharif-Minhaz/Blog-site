const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
// dev dependencies
const morgan = require("morgan");
const chalk = require("chalk");
// routes and middlewares
const setMiddlewares = require("./middlewares/middlewares");
const setRoutes = require("./routes/routes");

// views engine setup
app.set("view engine", "ejs");
app.set("views", "views");

const { PORT, DB_CONNECTION_STRING } = process.env;

if (app.get("env").toLowerCase() === "development") {
	app.use(morgan("dev"));
}

// using routes from routes directory
setMiddlewares(app);
setRoutes(app);

mongoose
	.connect(DB_CONNECTION_STRING, {
		useNewUrlParser: true,
	})
	.then(() => {
		console.info(chalk.green("Connected to The Database"));
		app.listen(PORT, () => {
			console.log(chalk.yellow(`Server running at http://localhost:${PORT}`));
		});
	})
	.catch((err) => console.error(err));
