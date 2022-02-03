const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/uploads");
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
	},
});

const upload = multer({
	storage,
	limits: 1024 * 1024 * 5, // 5MB
	fileFilter: (req, file, cb) => {
		const types = /jpg|png|jpeg|gif/;
		const extName = types.test(path.extname(file.originalname).toLowerCase());
		const mimeType = types.test(file.mimetype);

		if (extName && mimeType) {
			cb(null, true);
		} else {
			cb(new Error("Only image file supported"));
		}
	},
});

module.exports = upload;