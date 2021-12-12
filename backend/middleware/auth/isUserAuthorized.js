import ServerError from '../../utilities/ServerError.js';
import User from '../../database/models/User.js';

const isUserAuthorized = async (req, res, next) => {
	try {
		const { id } = req.params;
		req.queriedUser = await User.findById({ _id: id });
		if (!req.queriedUser) {
			throw new ServerError('Unable to locate a user with that id.', 404);
		}

		if (req.currentUser._id.toString() !== req.queriedUser._id.toString()) {
			throw new ServerError('You are not permitted to do that.', 403);
		}
		next();
	} catch (error) {
		next(error);
	}
};

export default isUserAuthorized;