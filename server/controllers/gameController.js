const GameState = require('../models/GameState');

exports.saveGameState = async (req, res) => {
  const { userId, grid } = req.body;

  try {
    const existingState = await GameState.findOne({ userId });
    if (existingState) {
      existingState.grid = grid;
      await existingState.save();
    } else {
      const newState = new GameState({ userId, grid });
      await newState.save();
    }
    res.status(200).json({ message: 'Game state saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save game state' });
  }
};

exports.getGameState = async (req, res) => {
  const { userId } = req.params;

  try {
    const gameState = await GameState.findOne({ userId });
    if (gameState) {
      res.status(200).json({ grid: gameState.grid });
    } else {
      res.status(404).json({ message: 'No saved game state found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve game state' });
  }
};