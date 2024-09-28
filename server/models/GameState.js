const mongoose = require('mongoose');

const gameStateSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  grid: { type: Array, required: true }
});

module.exports = mongoose.model('GameState', gameStateSchema);