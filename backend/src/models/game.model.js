const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const gameSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
gameSchema.plugin(toJSON);

/**
 * @typedef Game
 */
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
