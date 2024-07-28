/** @format */

const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const router = express.Router();
const { getToken } = require('../utils/helpers');

//Register a new user
router.post('/register', async (req, res) => {
	const { email, password, firstName, lastName, username } = req.body;

	//Check if user already exists
	const user = await User.findOne({ email: email });
	try {
		const user = await User.findOne({ email: email });
	} catch (error) {
		return res.status(403).json({ error: 'Error finding the user!' });
	}
	if (user) {
		return res
			.status(403)
			.json({ error: 'A user with this email already exists!' });
	}

	//Create a new user
	const hashedPassword = await bcrypt.hash(password, 10);
	const newUserData = {
		email,
		password: hashedPassword,
		firstName,
		lastName,
		username,
	};
	const newUser = await User.create(newUserData);

	//Create JWT token for the user
	const token = await getToken(email, newUser);

	const userToReturn = { ...newUser.toJSON(), token };
	delete userToReturn.password;
	return res.json(userToReturn);
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	//Check if user doesn't exists
	const user = await User.findOne({ email: email });
	try {
		const user = await User.findOne({ email: email });
	} catch (error) {
		return res.status(403).json({ error: 'Error finding the user!' });
	}
	if (!user) {
		return res
			.status(403)
			.json({ error: "A user with this email doesn't exists!" });
	}

	//If email exists, check is password matches
	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		return res.status(403).json({ error: 'Incorrect password!' });
	}

	//Create JWT token for the user
	const token = await getToken(user.email, user);
	const userToReturn = { ...user.toJSON(), token };
	delete userToReturn.password;
	return res.json(userToReturn);
});

module.exports = router;
