const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	article: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Article',
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
