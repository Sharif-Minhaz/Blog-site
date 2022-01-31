const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const session = require("express-session");
const flash = require("connect-flash");
const MongoDBStore = require("connect-mongodb-session")(session);
const { bindUserWithRequest } = require("./middlewares/auth.middleware");
const setLocals = require("./middlewares/setLocals.middleware");
const authRoute = require("./routes/auth.route");
const dashboardRoute = require("./routes/dashboard.route");

// views engine setup
app.set("view engine", "ejs");
app.set("views", "views");

const { PORT, DB_CONNECTION_STRING } = process.env;

const store = new MongoDBStore({
	uri: DB_CONNECTION_STRING,
	collection: "sessions",
});

// Catch errors
store.on("error", (err) => {
	console.log(err);
});

//middlewares
const middleware = [
	express.static("public"),
	express.urlencoded({ extended: true }),
	express.json(),
	session({
		secret: process.env.SECRET_KEY || "SECRET_KEY",
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 2, // 2 hours
		},
		store: store,
	}),
	bindUserWithRequest(),
	setLocals(),
	flash(),
];

app.use(middleware);
app.use("/auth", authRoute);
app.use("/dashboard", dashboardRoute);

app.get("/", (req, res) => {
	res.json({
		msg: "This is home page!",
	});
});

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
