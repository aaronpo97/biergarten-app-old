import dotenv from 'dotenv';
import User from '../../database/models/User.js';
import ServerError from '../../utilities/errors/ServerError.js';
import sendConfirmationEmail from '../../utilities/nodemailer/sendConfirmationEmail.js';

import {
  generateAccessToken,
  generateConfirmationToken,
  generateRefreshToken,
} from '../../utilities/auth/generateTokens.js';

import SuccessResponse from '../../utilities/response/SuccessResponse.js';

dotenv.config();

const registerUser = async (req, res, next) => {
  try {
    const userToRegister = req.body;
    const { username, email, password, dateOfBirth, firstName, lastName } = userToRegister;

    const profile = {
      likes: [],
      affiliation: null,
      displayImage: null,
      currentCity: null,
      bio: null,
      gender: null,
    };
    const user = new User({ username, email, dateOfBirth, profile, firstName, lastName });

    await User.register(user, password);
    await user.save();

    const confirmationToken = await generateConfirmationToken(user);
    await sendConfirmationEmail(email, user, confirmationToken);

    const refreshToken = await generateRefreshToken(user);
    req.refreshToken = refreshToken;
    const accessToken = await generateAccessToken(req);

    const newUser = await User.findById(user._id);
    if (!newUser) throw new ServerError('User registration failed.', 400);

    const status = 201;
    next(
      new SuccessResponse(`New user created.`, status, {
        newUser,
        refreshToken,
        accessToken,
      }),
    );
  } catch (error) {
    next(new ServerError(error.message, 400));
  }
};

export default registerUser;
