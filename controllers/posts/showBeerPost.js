import ServerError from '../../utilities/errors/ServerError.js';
import SuccessResponse from '../../utilities/response/SuccessResponse.js';
import sort from '../../utilities/data/sorter.js';

import BeerPost from '../../database/models/BeerPost.js';

const showBeerPost = async (req, res, next) => {
  const { id } = req.params;

  try {
    const beerData = await BeerPost.findById(id)
      .populate('brewery', 'name')
      .populate('postedBy', 'username')
      .populate('images', 'url')
      .populate('likedBy', 'username');

    beerData.comments = sort(beerData.comments, 'descending', 'timestamp');

    const payload = beerData;

    if (!payload) throw new ServerError('Could not find a post with that id.', 404);
    const status = 200;
    next(
      new SuccessResponse(
        `Sending data for beerpost '${id}'`,
        status,
        payload,
        req.didTokenRegenerate ? req.accessToken : undefined,
      ),
    );
  } catch (error) {
    next(error);
  }
};

export default showBeerPost;
