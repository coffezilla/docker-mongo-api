const express = require("express");
const router = express.Router();
const Posts = require("../models/Posts");

// GET
router.get("/", async (req, res) => {
	try {
		const posts = await Posts.find();
		res.json(posts);
	} catch (err) {
		res.json(err);
	}
});

// GET SPECIFIC
router.get("/:postId", async (req, res) => {
	const { postId } = req.params;
	const posts = await Posts.find({ _id: postId });
	try {
		res.json(posts);
	} catch (err) {
		res.json(err);
	}
});

// POST
router.post("/", async (req, res) => {
	if (req.query.auth == process.env.AUTH) {
		const { title, description } = req.body;

		if (!title) {
			res.json("Missing data");
		} else {
			const posts = new Posts({
				title: title,
				description: description,
			});

			try {
				const savedPost = await posts.save();
				res.json(savedPost);
			} catch (err) {
				res.json(err);
			}
		}
	} else {
		res.json("not authenticated");
	}
});

// PATCH
router.patch("/:postId", async (req, res) => {
	if (req.query.auth == process.env.AUTH) {
		const { postId } = req.params;
		const { title, description } = req.body;

		if (!title) {
			res.json("Missing data");
		} else {
			try {
				const posts = await Posts.updateOne(
					{
						_id: postId,
					},
					{
						$set: {
							title: title,
							description: description,
						},
					}
				);
				res.json(posts);
			} catch (err) {
				res.json(err);
			}
		}
	} else {
		res.json("not authenticated");
	}
});

// DELETE
router.delete("/:postId", async (req, res) => {
	if (req.query.auth == process.env.AUTH) {
		const { postId } = req.params;
		try {
			const posts = await Posts.remove({ _id: postId });
			res.json(posts);
		} catch (err) {
			res.json(err);
		}
	} else {
		res.json("not authenticated");
	}
});

module.exports = router;
