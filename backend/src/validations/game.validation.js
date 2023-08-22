const Joi = require('joi');

const createGame = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

module.exports = {
  createGame,
};
