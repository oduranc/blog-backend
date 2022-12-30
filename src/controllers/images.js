const multer = require('multer');
const cloudinary = require('cloudinary');
const dotenv = require('dotenv');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

dotenv.config();
const cloud = cloudinary.v2;

cloud.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary: cloud,
	params: {
		folder: 'blog-uploads',
	},
});

module.exports = multer({ storage: storage });
