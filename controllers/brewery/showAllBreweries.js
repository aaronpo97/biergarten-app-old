import Brewery from '../../database/models/Brewery.js';
import sort from '../../utilities/data/sorter.js';

import SuccessResponse from '../../utilities/response/SuccessResponse.js';

const showAllBreweries = async (req, res, next) => {
  try {
    const allBreweries = await Brewery.find()
      .populate('beers')
      .populate('postedBy', 'username')
      .populate('images', 'url');

    const message = `Sending brewery index.${
      req.query.sort && req.query.param ? ` Sorting by ${req.query.param} in ${req.query.sort} order.` : ''
    }`;
    const status = 200;
    const payload = sort(allBreweries, req.query.sort, req.query.param);
    next(new SuccessResponse(message, status, payload, req.didTokenRegenerate ? req.accessToken : undefined));
  } catch (error) {
    next(error);
  }
};

export default showAllBreweries;
