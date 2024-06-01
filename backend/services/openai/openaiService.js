//openaiService.js

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const { openaiApiKey, openaiEndpoint } = require('../../config/keys');

const client = new OpenAIClient(openaiEndpoint, new AzureKeyCredential(openaiApiKey));

const fitnessSystemMessage = { 
  role: "system", 
  content: "You are a helpful, knowledgeable, and friendly fitness coach. You provide personalized fitness advice and plans based on the user's goals and fitness level." 
};

const getChatResponse = async (userMessages) => {
  const messages = [fitnessSystemMessage, ...userMessages];
  
  try {
    const chatResponse = await client.getChatCompletions("completions", messages);
    return chatResponse.choices.map(choice => choice.message.content);
  } catch (err) {
    console.error(`Error: ${err}`);
    throw err;
  }
};

module.exports = { getChatResponse };
