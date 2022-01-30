const express = require("express");

const app = express();
require("dotenv").config();

const { PORT } = process.env;

app.get("/", (req, res) => {
	res.json({
		msg: "app running.",
	});
});

app.listen(PORT || 8080, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
