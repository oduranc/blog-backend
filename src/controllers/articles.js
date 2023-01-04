const articleSchema = require('../models/article');

const getAllArticles = (req, res) => {
	articleSchema
		.find()
		.sort({ created: -1 })
		.then((data) => res.status(200).json(data))
		.catch((error) => res.status(500).json({ message: error }));
};

const getArticlesByCategory = (req, res) => {
	const { category } = req.params;
	articleSchema
		.find({ category: category })
		.then((data) => res.status(200).json(data))
		.catch((error) => res.status(500).json({ message: error }));
};

const getArticleById = (req, res) => {
	const { id } = req.params;
	articleSchema
		.findById(id)
		.then((data) => res.status(200).json(data))
		.catch((error) => res.status(500).json({ message: error }));
};

const createArticle = (req, res) => {
	var article = new articleSchema();
	article.title = req.body.title;
	article.category = req.body.category;
	article.description = req.body.description;
	article.postedBy = req.body.postedBy;
	article.cover = req.file.path;
	article
		.save()
		.then((data) => res.status(200).json(data))
		.catch((error) => res.json({ message: error }));
};

const editArticleById = (req, res) => {
	const { id } = req.params;
	const updates = req.body;

	articleSchema
		.updateOne({ _id: id }, { $set: updates })
		.then((data) => res.status(200).json(data))
		.catch((error) => res.status(500).json({ message: error }));
};

const deleteArticleById = (req, res) => {
	const { id } = req.params;

	articleSchema
		.deleteOne({ _id: id })
		.then((data) => res.status(200).json(data))
		.catch((error) => res.status(500).json({ message: error }));
};

module.exports = {
	getAllArticles,
	getArticlesByCategory,
	getArticleById,
	createArticle,
	editArticleById,
	deleteArticleById,
};
