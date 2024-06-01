require('dotenv').config();

module.exports = {
  openaiApiKey: process.env.AZURE_OPENAI_API_KEY,
  openaiEndpoint: process.env.AZURE_OPENAI_ENDPOINT,
};
