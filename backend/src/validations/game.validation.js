const Joi = require('joi');

const createGame = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const startGame = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    gameId: Joi.string().optional().allow(null),
    gameType: Joi.string().required(),
  }),
};

const getGames = {};

const updateGame = {
  body: Joi.object().keys({
    answer: Joi.object().required(),
    finished: Joi.boolean().required(),
  }),
};

module.exports = {
  createGame,
  updateGame,
  startGame,
  getGames,
};
