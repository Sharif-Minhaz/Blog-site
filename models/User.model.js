const { Schema, model } = require("mongoose");

const Profile = require("./Profile.model");

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 30,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		profile: {
			type: Schema.Types.ObjectId,
			ref: Profile,
		},
	},
	{
		timestamps: true,
	}
);

const User = model("User", userSchema);
module.exports = User;
