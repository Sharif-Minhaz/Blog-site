const { Schema, model } = require("mongoose");

// const User = require("./User.model")
// const Post = require("./Post.model")

const commentSchema = new Schema(
	{
		post: {
			type: Schema.Types.ObjectId,
			ref: "Post",
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		body: {
			type: Schema.Types.ObjectId,
			trim: true,
			required: true,
		},
		replies: [
			{
				body: {
					type: String,
					required: true,
				},
				user: {
					type: Schema.Types.ObjectId,
					ref: "User",
					required: true,
				},
				createAt: {
					type: Date,
					default: new Date(),
				},
			},
		],
	},
	{ timestamps: true }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
