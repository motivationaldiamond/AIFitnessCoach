//database.js

const { MongoClient } = require('mongodb');
const { dbURI } = require('../../backend/config/keys');

const connectDB = async () => {
  try {
    const client = new MongoClient(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    console.log('Connected to MongoDB');

    // You can optionally return the client object if you need to access it elsewhere in your application
    return client;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
