const { Schema, model } = require("mongoose");

// const Profile = require("./Profile.model");

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			maxlength: 15,
			trim: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		profile: {
			type: Schema.Types.ObjectId,
			ref: "Profile",
		},
		profilePics: {
			type: String,
			default: "/uploads/default.jpg",
		}
	},
	{
		timestamps: true,
	}
);

const User = model("User", userSchema);
module.exports = User;
