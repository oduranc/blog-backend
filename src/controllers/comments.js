const { default: mongoose } = require('mongoose');
const commentSchema = require('../models/comment');
const articleSchema = require('../models/article');
const userSchema = require('../models/user');

const getAllComments = (req, res) => {
	commentSchema
		.find()
		.sort({ created: -1 })
		.then((data) => res.status(200).json(data))
		.catch((error) => res.status(500).json({ message: error }));
};

const getCommentsByArticle = (req, res) => {
	commentSchema
		.find()
		.where('article')
		.equals(req.params.article)
		.sort({ created: -1 })
		.then((data) => res.status(200).json(data))
		.catch((error) => res.status(500).json({ message: error }));
};

const getCommentById = (req, res) => {
	const { id } = req.params;
	commentSchema
		.findById(id)
		.then((data) => res.status(200).json(data))
		.catch((error) => res.status(500).json({ message: error }));
};

const createComment = (req, res) => {
	var comment = new commentSchema();
	comment.article = req.boddy.article;
	comment.user = req.body.user;
	comment.body = req.body.body;
	comment
		.save()
		.then((data) => res.status(200).json(data))
		.catch((error) => res.status(500).json({ message: error }));
};

const editCommentById = (req, res) => {
	const { id } = req.params;
	const updates = req.body;

	commentSchema
		.updateOne({ _id: id }, { $set: updates })
		.then((data) => res.status(200).json(data))
		.catch((error) => res.status(500).json({ message: error }));
};

const deleteCommentById = (req, res) => {
	const { id } = req.params;

	commentSchema
		.deleteOne({ _id: id })
		.then((data) => res.status(200).json(data))
		.catch((error) => res.status(500).json({ message: error }));
};

module.exports = {
	getAllComments,
	getCommentsByArticle,
	getCommentById,
	createComment,
	editCommentById,
	deleteCommentById,
};
