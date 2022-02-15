const express = require("express");
require("dotenv").config();
const config = require("config");
// const morgan = require("morgan");
const session = require("express-session");
const flash = require("connect-flash");
const MongoDBStore = require("connect-mongodb-session")(session);
// middlewares
const { bindUserWithRequest } = require("./auth.middleware");
const setLocals = require("./setLocals.middleware");

const { DB_ADMIN, DB_PASSWORD } = process.env;

const store = new MongoDBStore({
	uri: `mongodb+srv://${DB_ADMIN}:${DB_PASSWORD}@cluster0.h9bja.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
	collection: "sessions",
});
// Catch errors
store.on("error", (err) => {
	console.error(err);
});

const middleware = [
	// morgan("dev"),
	express.static("public"),
	express.urlencoded({ extended: true }),
	express.json(),
	session({
		secret: config.get("secret"),
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 2, // 2 hours
		},
		store: store,
	}),
	flash(),
	bindUserWithRequest(),
	setLocals(),
];

module.exports = (app) => {
	middleware.forEach((m) => {
		app.use(m);
	});
};
