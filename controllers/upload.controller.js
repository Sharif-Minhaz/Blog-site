const fs = require("fs");
const User = require("../models/User.model");
const Profile = require("../models/Profile.model");

exports.uploadProfilePics = async (req, res, next) => {
	if (req.file) {
		try {
			let oldProfilePics = req.user.profilePics;
			let profile = await User.findOne({ user: req.user._id });
			let profilePics = `/uploads/${req.file.filename}`;
			if (profile) {
				await Profile.findOneAndUpdate({ user: req.user._id }, { $set: { profilePics } });
			}
			await User.findOneAndUpdate(
				{
					_id: req.user._id,
				},
				{ $set: { profilePics } }
			);

			if (oldProfilePics !== "/uploads/default.jpg") {
				fs.unlink(`public/${oldProfilePics}`, (err) => {
					err && console.error(err);
				});
			}

			res.status(200).json({
				profilePics,
			});
		} catch (err) {
			res.status(500).json({
				profilePics: req.user.profilePics,
			});
		}
	} else {
		res.status(500).json({
			profilePics: req.user.profilePics,
		});
	}
};

exports.removeProfilePics = (req, res, next) => {
	try {
		let defaultProfile = "/uploads/default.jpg";
		let currentProfilePics = req.user.profilePics;

		fs.unlink(`public/${currentProfilePics}`, async (err) => {
			let profile = await User.findOne({ user: req.user._id });
			if (profile) {
				await Profile.findOneAndUpdate(
					{ user: req.user._id },
					{
						$set: {
							profilePics: defaultProfile,
						},
					}
				);
			}
			await User.findOneAndUpdate(
				{
					_id: req.user._id,
				},
				{ $set: { profilePics: defaultProfile } }
			);
		});

		res.status(200).json({
			profilePics: defaultProfile,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "can't remove profile picture",
		});
	}
};

exports.postImageUploadController = (req, res, next) => {
	if (req.file) {
		return res.status(200).json({
			imgUrl: `/uploads/${req.file.filename}`,
		});
	}
	return res.status(500).json({
		message: "Server Error",
	});
};
