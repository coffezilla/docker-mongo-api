const mongoose = require("mongoose");

// schema
const SchemaPost = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		default: "",
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
});

//
module.exports = mongoose.model("Post", SchemaPost);
