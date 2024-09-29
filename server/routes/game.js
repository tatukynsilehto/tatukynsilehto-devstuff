const express = require("express");
const router = express.Router();
const Game = require("../models/Game");

// Save game state
router.post("/save-state", async (req, res) => {
  const { grid } = req.body;
  try {
    await Game.findOneAndUpdate({ userId: "user1" }, { grid }, { upsert: true });
    res.status(200).send("Game state saved!");
  } catch (error) {
    res.status(500).send("Error saving game state.");
  }
});

// Load game state
router.get("/load-state", async (req, res) => {
  try {
    const game = await Game.findOne({ userId: "user1" });
    res.status(200).json({ grid: game ? game.grid : null });
  } catch (error) {
    res.status(500).send("Error loading game state.");
  }
});

module.exports = router;