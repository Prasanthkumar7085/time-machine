const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const gameSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    answers: [
      {
        guessCenter: {
          type: Number,
          required: true,
        },
        guessRange: {
          type: Number,
          required: true,
        },
        correctAnswer: {
          type: Number,
          required: true,
        },
        predictiveAccuracy: {
          type: Number,
          required: true,
        },
        confidentBandAccuracy: {
          type: Number,
          required: true,
        },
        percisionOfConfidentBand: {
          type: Number,
          required: true,
        },
        year: {
          type: Number,
          required: true,
        },
        required: false,
      },
    ],
    finished: {
      type: Boolean,
      required: true,
      default: false,
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
