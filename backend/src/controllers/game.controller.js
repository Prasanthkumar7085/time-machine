const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { gameService } = require('../services');

const createGame = catchAsync(async (req, res) => {
  const game = await gameService.createGame(req.body, req.user);
  res.status(httpStatus.CREATED).send(game);
});

const startGame = catchAsync(async (req, res) => {
  const game = await gameService.startGame(req.body, req.user);
  res.status(httpStatus.CREATED).send(game);
});

const getGames = catchAsync(async (req, res) => {
  const games = await gameService.getGames(req.user);
  res.status(httpStatus.CREATED).send(games);
});

const updateGame = catchAsync(async (req, res) => {
  const game = await gameService.updateGame(req.body, req.user, req.params.gameId);
  res.status(httpStatus.CREATED).send(game);
});

module.exports = {
  createGame,
  updateGame,
  getGames,
  startGame,
};
