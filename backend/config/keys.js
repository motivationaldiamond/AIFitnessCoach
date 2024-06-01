require('dotenv').config();

module.exports = {
  dbURI: process.env.MONGO_URI,
  openaiApiKey: process.env.AZURE_OPENAI_API_KEY,
  openaiEndpoint: process.env.AZURE_OPENAI_ENDPOINT,
};
