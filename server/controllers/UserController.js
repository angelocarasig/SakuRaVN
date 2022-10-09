// Model
const User = require("../models/User");
const UserException = require("../exceptions/UserException");

// VNDB
const VNDB = require("vndb-api");

const getAllUsers = async (req, res) => {
	const users = await User.find();
	res.status(200).json(users);
};

const getUser = async (req, res) => {
	res.send(res.user);
};

const addUser = async (req, res) => {

	let user = await User.find({id: req.params.id});
	if (user.length > 0) {
		res.status(400).json({message: "User already exists!"});
		return;
	}

	const vndb = new VNDB("clientname", {});

	await vndb
		.query(`get user basic (id = ${req.params.id})`)
		.then((response) => {

			const userToAdd = new User({
				id: response.items[0].id,
				username: response.items[0].username,
			});

			try {
				const newUser = userToAdd.save();
				res.status(201).json({message: `User ${userToAdd.id} has been successfully added.`});
			} 
			catch (e) {
				res.status(400).json({ message: e.message });
			}
		})
		.catch((e) => {
			res.status(400).json({message: e.message});
		});
};

const updateUser = (req, res) => {
	
	const vndb = new VNDB("clientname", {});

	vndb.query(`get user basic (id = ${req.params.id})`)
		.then((response) => {
			
			const userToUpdate = new User({
				id: response.items[0].id,
				username: response.items[0].username,
			});

			try {
				let updatedUser = User.updateMany({ id: userToUpdate.id },{ $set: { username: userToUpdate.username } });
				res.status(200).json({message: `User ${userToUpdate.id} has been sucecessfully updated.`});
			} 
			catch (e) {
				res.status(400).json({ message: e.message });
			}
		})
		.catch((e) => {
			res.status(400).json({message: e.message});
		});
};

const deleteUser = async (req, res) => {
	try {
		await User.deleteMany({ id: res.user.id });
		res.status(200).json({ message: "User has been removed." });
	} catch (e) {
		res.status(500).json({ message: "User could not be removed." });
	}
};

async function searchUser(req, res, next) {
	let user;
	
	try {
		user = await User.find({ id: req.params.id });
		if (user.length <= 0) {
			next(UserException.UserNotFound());
		}
	} 
	catch (e) {
		next(UserException.internal(e.message));
	}

	// Returns array with only 1 element
	res.user = user[0];
	next();
}

module.exports = {
	searchUser,
	getAllUsers,
	getUser,
	addUser,
	updateUser,
	deleteUser,
};
