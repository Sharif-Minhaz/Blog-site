const User = require("../models/User.model");
const Profile = require("../models/Profile.model");

exports.uploadProfilePics = async (req, res, next) => {
	if (req.file) {
		try {
			let profile = await User.findOne({ user: req.user._id });
			let profilePics = `/uploads/${req.file.filename}`;
			if (profile) {
				await Profile.findOneAndUpdate(
                    { user: req.user._id }, 
                    { $set: { profilePics } }
                );
			} 
            await User.findOneAndUpdate(
				{
					_id: req.user._id,
				},
				{ $set: { profilePics } }
			);
			res.status(200).json({
				profilePics,
			});
		} catch (err) {
			res.status(500).json({
                profilePics: req.user.profilePics,
            })
		}
	} else {
        res.status(500).json({
			profilePics: req.user.profilePics,
		});
    }
};
