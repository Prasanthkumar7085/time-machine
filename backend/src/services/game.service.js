const httpStatus = require('http-status');
const { Game } = require('../models');
const ApiError = require('../utils/ApiError');

export const GAME_TYPES = ['co2-concentrations', 'infant-mortality-rate', 'non-state-conflict', 'us-poverty'];

/**
 * Create a user
 * @param {Object} gameBody
 * @returns {Promise<Game>}
 */
const createGame = async (gameBody, user) => {
  const userId = user._id;
  const games = await Game.find({ user: userId });
  const remainingTypes = GAME_TYPES.filter((type) => !games.some((game) => game.type === type && game.finished === true));
  console.log(remainingTypes);
  // if (await User.isEmailTaken(userBody.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  // return User.create(userBody);
};

module.exports = {
  createGame,
};
