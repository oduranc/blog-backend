const { default: mongoose } = require('mongoose');
const commentSchema = require('../models/comment');
const articleSchema = require('../models/article');
const userSchema = require('../models/user');

const getAllComments = (req, res) => {
	commentSchema
		.find()
		.then((data) => res.json(data))
		.catch((error) => res.json({ message: error }));
};

const getCommentsByArticle = (req, res) => {
	commentSchema
		.find()
		.where('article')
		.equals(req.params.article)
		.then((data) => res.json(data))
		.catch((error) => res.json({ message: error }));
};

const getCommentById = (req, res) => {
	const { id } = req.params;
	commentSchema
		.findById(id)
		.then((data) => res.json(data))
		.catch((error) => res.json({ message: error }));
};

const createComment = (req, res) => {
	var comment = new commentSchema();
	if (
		articleSchema.exists({ _id: req.body.article }) &&
		userSchema.exists({ _id: req.body.user })
	) {
		const article = mongoose.Types.ObjectId(req.body.article).valueOf();
		const user = mongoose.Types.ObjectId(req.body.user).valueOf();
		comment.article = article;
		comment.user = user;
		comment.body = req.body.body;
		comment
			.save()
			.then((data) => res.json(data))
			.catch((error) => res.json({ message: error }));
	} else {
		res.json({ message: 'Artículo o usuario no existe' });
	}
};

const editCommentById = (req, res) => {
	const { id } = req.params;
	const updates = req.body;

	commentSchema
		.updateOne({ _id: id }, { $set: updates })
		.then((data) => res.json(data))
		.catch((error) => res.json({ message: error }));
};

const deleteCommentById = (req, res) => {
	const { id } = req.params;

	commentSchema
		.deleteOne({ _id: id })
		.then((data) => res.json(data))
		.catch((error) => res.json({ message: error }));
};

module.exports = {
	getAllComments,
	getCommentsByArticle,
	getCommentById,
	createComment,
	editCommentById,
	deleteCommentById,
};