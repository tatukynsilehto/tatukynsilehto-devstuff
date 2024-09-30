const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config(); // Ensure you can use environment variables from your .env file

const app = express();
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://kariankka:${process.env.DB_PASSWORD}@devstuff.ghk7x.mongodb.net/?retryWrites=true&w=majority&appName=devstuff`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Optionally, keep the connection open for further use
    // await client.close();
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});