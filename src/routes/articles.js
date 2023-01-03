const express = require('express');
const {
	getAllArticles,
	getArticlesByCategory,
	getArticleById,
	createArticle,
	editArticleById,
	deleteArticleById,
} = require('../controllers/articles');
const upload = require('../controllers/images');

const router = express.Router();

router
	.get('/', getAllArticles)
	.get('/category/:category', getArticlesByCategory)
	.get('/:id', getArticleById)
	.post('/', /*upload.single('image'),*/ createArticle)
	.patch('/:id', editArticleById)
	.delete('/:id', deleteArticleById);

module.exports = router;
