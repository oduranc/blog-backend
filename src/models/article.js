const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	postedBy: {
		type: String,
		required: true,
	},
	created: {
		type: Date,
		default: Date.now,
		required: true,
	},
	cover: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Article', articleSchema);
