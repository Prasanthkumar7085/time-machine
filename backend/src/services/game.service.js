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
  if (remainingTypes.length === 0) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Sorry, you have already played all the games!');
  }
  const random = Math.floor(Math.random() * remainingTypes.length);
  const tempType = remainingTypes[random];
  return Game.create({ ...gameBody, user: userId, type: tempType });
};

/**
 * Create a user
 * @param {Object} gameBody
 * @returns {Promise<Game>}
 */
const startGame = async (gameBody, user) => {
  const userId = user._id;
  const game = await Game.findById(gameBody.gameId);
  if (game) {
    if (game.finished === false) {
      return game;
    } else {
      throw new ApiError(httpStatus.UNAUTHORIZED, `Sorry, you have already played this ${gameBody.type}!`);
    }
  }
  const gameType = gameBody.gameType;
  delete gameBody['gameId'];
  delete gameBody['gameType'];
  return Game.create({ ...gameBody, user: userId, type: gameType });
};

/**
 * Create a user
 * @param {Object} gameBody
 * @returns {Promise<Game>}
 */
const getGames = async (user) => {
  const userId = user._id;
  const games = await Game.find({ user: userId });
  return games;
};

/**
 * Create a user
 * @param {Object} gameBody
 * @returns {Promise<Game>}
 */
const updateGame = async (body, user, gameId) => {
  const userId = user._id;
  const { answer, finished } = body;
  const game = await Game.findById(gameId);
  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }
  game.answers.push(answer);
  game.finished = finished;
  await game.save();
  return game;
};

module.exports = {
  createGame,
  updateGame,
  getGames,
  startGame,
};
