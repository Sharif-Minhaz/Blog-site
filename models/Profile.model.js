const { Schema, model } = require("mongoose");

const User = require("./User.model");
const Post = require("./Post.model");

const profileSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: User,
			required: true,
		},
		name: {
			type: String,
			maxlength: 30,
			trim: true,
			required: true,
		},
		title: {
			type: String,
			maxlength: 100,
			trim: true,
		},
		bio: {
			type: String,
			maxlength: 500,
			trim: true,
		},
		profilePic: String,
		links: {
			website: String,
			facebook: String,
			twitter: String,
			github: String,
		},
		posts: [
			{
				type: Schema.Types.ObjectId,
				ref: Post,
			},
		],
		bookmarks: [
			{
				type: Schema.Types.ObjectId,
				ref: Post,
			},
		],
	},
	{
		timestamps: true,
	}
);

const Profile = model("Profile", profileSchema);
module.exports = Profile;
