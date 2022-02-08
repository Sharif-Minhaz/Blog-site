const Post = require("../../models/Post.model");
const Comment = require("../../models/Comment.model");

exports.createCommentController = async (req, res, next) => {
	let { postId } = req.params;
	let { body } = req.body;

	if (!req.user) {
		return res.status(403).json({
			error: "Your are not a authenticated user!",
		});
	}

	let comment = new Comment({
		post: postId,
		user: req.user._id,
		body,
		replies: [],
	});

	try {
		let createdComment = await comment.save();
		await Post.findOneAndUpdate({ _id: postId }, { $push: { comments: createdComment._id } });

		let commentJSON = await Comment.findById(createdComment._id).populate({
			path: "user",
			select: "profilePics username",
		});

		return res.status(201).json(commentJSON);
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			error: "Serve error occurred!",
		});
	}
};

exports.replyCommentPostController = async (req, res, next) => {
	let { commentId } = req.params;
	let { body } = req.body;

	if (!req.user) {
		return res.status(403).json({
			error: "Your are not an authenticated user!",
		});
	}

	let reply = {
		body,
		user: req.user._id,
	};

	try {
		await Comment.findOneAndUpdate(
            { _id: commentId }, 
            { $push: { replies: reply } }
        );

		res.status(201).json({
			...reply,
			profilePics: req.user.profilePics,
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			error: "Serve error occurred!",
		});
	}
};
