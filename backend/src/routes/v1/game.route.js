const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const gameValidation = require('../../validations/game.validation');
const gameController = require('../../controllers/game.controller');

const router = express.Router();

router.route('/init').post(auth(), validate(gameValidation.createGame), gameController.createGame);

module.exports = router;
