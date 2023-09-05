const Joi = require('joi');

const createGame = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const updateGame = {
  body: Joi.object().keys({
    answer: Joi.object().required(),
    finished: Joi.boolean().required(),
  }),
};

module.exports = {
  createGame,
  updateGame,
};
