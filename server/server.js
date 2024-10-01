const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const uri = `mongodb+srv://kariankka:${process.env.DB_PASSWORD}@devstuff.ghk7x.mongodb.net/?retryWrites=true&w=majority&appName=devstuff`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

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

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

run().catch(console.dir);

app.post('/api/save', async (req, res) => {
  const { grid, userId } = req.body;

  try {
    const game = await Game.findOneAndUpdate(
      { userId },
      { grid },
      { new: true, upsert: true }
    );
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save game state' });
  }
});

app.get('/api/load/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const game = await Game.findOne({ userId });
    if (!game) return res.status(404).json({ message: 'Game not found' });

    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load game state' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});