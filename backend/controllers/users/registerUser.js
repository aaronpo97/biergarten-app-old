import jwt from 'jsonwebtoken';

import User from '../../database/models/User.js';
import ServerError from '../../utilities/errors/ServerError.js';

import sendConfirmationEmail from '../../utilities/nodemailer/sendConfirmationEmail.js';

import dotenv from 'dotenv';

dotenv.config();

const { CONFIRMATION_TOKEN_SECRET } = process.env;

const registerUser = async (req, res, next) => {
	try {
		const userToRegister = req.body;
		const { username, email, password, dateOfBirth, profile = {} } = userToRegister;
		const user = new User({ username, email, dateOfBirth, profile });

		await User.register(user, password);
		await user.save();

		const confirmationToken = jwt.sign(
			{ userToConfirm: user.username, id: user._id },
			CONFIRMATION_TOKEN_SECRET,
			{ expiresIn: '10m' },
			{ algorithm: 'HS256' }
		);

		// await sendConfirmationEmail(email, user, confirmationToken);
		console.log(
			`http://localhost:5000/users/confirm/${userObj._id}/${confirmationToken}`
		);

		const newUser = await User.findById(user._id);

		const status = 201;
		res.status(status).json({
			status,
			newUser,
			success: true,
			message: 'New user created.',
		});
	} catch (error) {
		next(new ServerError(error.message, 400));
	}
};

export default registerUser;