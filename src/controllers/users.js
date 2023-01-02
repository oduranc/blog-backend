const userSchema = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const saltRounds = 10;

const getAllUsers = (req, res) => {
	userSchema
		.find()
		.then((data) => res.status(200).json(data))
		.catch((error) => res.status(500).json({ message: error }));
};

const getUserById = (req, res) => {
	const { id } = req.params;
	userSchema
		.findById(id)
		.then((data) => res.status(200).json(data))
		.catch((error) => res.status(500).json({ message: error }));
};

const createUser = async (req, res) => {
	var user = new userSchema();
	user.username = req.body.username;
	user.email = req.body.email;
	user.password = await bcrypt.hash(req.body.password, saltRounds);
	user
		.save()
		.then(() => loginUser(req, res))
		.catch((error) => res.status(500).json({ message: error }));
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await userSchema.findOne({ email: email });
		!user;
		if (await bcrypt.compare(password, user.password)) {
			const accessToken = jwt.sign(
				{
					id: user._id,
				},
				process.env.JWT_SECRET,
				{ expiresIn: '3d' }
			);
			res.status(200).json({ email, accessToken });
		} else {
			res.status(500).json({
				message: 'Usuario o contraseña incorrecta',
			});
		}
	} catch (error) {
		res.status(500).json({ message: 'Usuario o contraseña incorrecta' });
	}
};

const editUserById = (req, res) => {
	const { id } = req.params;
	const updates = req.body;

	userSchema
		.updateOne({ _id: id }, { $set: updates })
		.then((data) => res.status(200).json(data))
		.catch((error) => res.status(500).json({ message: error }));
};

const deleteUserById = (req, res) => {
	const { id } = req.params;

	userSchema
		.deleteOne({ _id: id })
		.then((data) => res.status(200).json(data))
		.catch((error) => res.status(500).json({ message: error }));
};

module.exports = {
	getAllUsers,
	getUserById,
	createUser,
	loginUser,
	editUserById,
	deleteUserById,
};
