const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  grid: {
    type: [[Number]],
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;