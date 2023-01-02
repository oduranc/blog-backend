const express = require('express');
const {
	getAllComments,
	getCommentsByArticle,
	getCommentById,
	createComment,
	editCommentById,
	deleteCommentById,
} = require('../controllers/comments');

const router = express.Router();

router
	.get('/', getAllComments)
	.get('/category/:category', getCommentsByArticle)
	.get('/:id', getCommentById)
	.post('/', createComment)
	.patch('/:id', editCommentById)
	.delete('/:id', deleteCommentById);

module.exports = router;
