const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
	user: {
		type: String,
		required: true,
	},
	article: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	created: {
		type: Date,
		default: Date.now,
		required: true,
	},
});

module.exports = mongoose.model('Comment', commentSchema);
