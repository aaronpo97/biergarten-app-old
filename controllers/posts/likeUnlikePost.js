import BeerPost from '../../database/models/BeerPost.js';
import SuccessResponse from '../../utilities/response/SuccessResponse.js';

const likeUnlikePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const beer = await BeerPost.findById(id);
    const { currentUser } = req;

    const isPostLikedByUser = currentUser.profile.likes
      .map((objectID) => objectID.toString())
      .includes(beer._id.toString());

    const isUserListed = beer.likedBy.map((objID) => objID.toString()).includes(currentUser._id.toString());
    //

    if (isPostLikedByUser && isUserListed) {
      beer.likedBy = beer.likedBy.pull(currentUser);
      currentUser.profile.likes = currentUser.profile.likes.pull(beer);
      await currentUser.save();
      await beer.save();

      next(
        new SuccessResponse(
          `Successfully unliked post.`,
          200,
          null,
          req.didTokenRegenerate ? req.accessToken : undefined,
        ),
      );
    } else {
      beer.likedBy.push(currentUser);
      currentUser.profile.likes.push(beer);
      await currentUser.save();
      await beer.save();

      const status = 200;
      next(
        new SuccessResponse(
          `Succesfully liked post '${beer.name}'`,
          status,
          undefined,
          req.didTokenRegenerate ? req.accessToken : undefined,
        ),
      );
    }
  } catch (error) {
    next(error);
  }
};

export default likeUnlikePost;
