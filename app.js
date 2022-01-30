const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const authRoute = require("./routes/auth.route");

// views engine setup
app.set("view engine", "ejs");
app.set("views", "views");

//middlewares
const middleware = [express.static("public"), express.urlencoded({ extended: true }), express.json()];

app.use(middleware);
app.use("/auth", authRoute);

app.get("/", (req, res) => {
	res.json({
		msg: "This is home page!",
	});
});

const { PORT, DB_CONNECTION_STRING } = process.env;
mongoose
	.connect(DB_CONNECTION_STRING, {
		useNewUrlParser: true,
	})
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server running at http://localhost:${PORT}`);
		});
	})
	.catch((err) => console.error(err));
