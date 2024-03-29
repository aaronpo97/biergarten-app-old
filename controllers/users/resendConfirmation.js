import dotenv from 'dotenv';

import SuccessResponse from '../../utilities/response/SuccessResponse.js';
import sendConfirmationEmail from '../../utilities/nodemailer/sendConfirmationEmail.js';
import { generateConfirmationToken } from '../../utilities/auth/generateTokens.js';

dotenv.config();

const resendConfirmation = async (req, res, next) => {
  // generating a new confirmation token for if the initial one expires
  try {
    const user = req.currentUser;
    const confirmationToken = await generateConfirmationToken(user);

    const message = `Generated new confirmation token for user: ${user.username}`;
    const status = 200;

    await sendConfirmationEmail(user.email, user, confirmationToken);
    next(new SuccessResponse(message, status));
  } catch (error) {
    next(error);
  }
};
export default resendConfirmation;
