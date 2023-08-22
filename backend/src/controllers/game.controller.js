const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { gameService } = require('../services');

const createGame = catchAsync(async (req, res) => {
  const game = await gameService.createGame(req.body, req.user);
  res.status(httpStatus.CREATED).send(game);
});

module.exports = {
  createGame,
};
