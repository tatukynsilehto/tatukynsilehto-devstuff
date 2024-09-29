const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  userId: String,
  grid: [[Number]],
});

module.exports = mongoose.model("Game", GameSchema);