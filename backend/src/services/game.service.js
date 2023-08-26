const httpStatus = require('http-status');
const { Game } = require('../models');
const ApiError = require('../utils/ApiError');

const GAME_TYPES = ['co2-concentrations', 'infant-mortality-rate', 'non-state-conflict', 'us-poverty'];

/**
 * Create a user
 * @param {Object} gameBody
 * @returns {Promise<Game>}
 */
const createGame = async (gameBody, user) => {
  const userId = user._id;
  const games = await Game.find({ user: userId });
  const remainingTypes = GAME_TYPES.filter((type) => {
    const hasThisType = games.some((game) => game.type === type && game.finished === true);
    return !hasThisType;
  });
  // if (remainingTypes.length === 0) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'Sorry, you have already played all the games!');
  // }
  const random = Math.floor(Math.random() * remainingTypes.length);
  const tempType = 'co2-concentrations';
  return Game.create({ ...gameBody, user: userId, type: tempType });
};

module.exports = {
  createGame,
};
