const express = require("express");
const app = express();

// utils
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

const mongoose = require("mongoose");

// middleware
app.use(bodyParser.json());
app.use(cors());

// ROUTES
// posts
const routePosts = require("./routes/posts");
app.use("/posts", routePosts);

// base route
app.get("/", (req, res) => {
	res.send("Welcome");
});

// connect
mongoose
	.connect(process.env.DB_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Database Connected");
	})
	.catch((err) => {
		console.log(err);
	});

// listening
const port = process.env.PORT || 3000;
app.listen(port);
