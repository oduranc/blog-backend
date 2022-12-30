const express = require('express');
const {
	getAllUsers,
	getUserById,
	createUser,
	loginUser,
	editUserById,
	deleteUserById,
} = require('../controllers/users');

const router = express.Router();

router
	.get('/', getAllUsers)
	.get('/:id', getUserById)
	.post('/signup', createUser)
	.post('/login', loginUser)
	.patch('/:id', editUserById)
	.delete('/:id', deleteUserById);

module.exports = router;
