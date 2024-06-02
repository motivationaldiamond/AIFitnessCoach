// openaiService.js

// Import required modules and dependencies
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const { openaiApiKey, openaiEndpoint } = require('../../config/keys');
const NutritionService = require('../chat/nutritionService');

// Initialize OpenAI client
const client = new OpenAIClient(openaiEndpoint, new AzureKeyCredential(openaiApiKey));
const nutritionService = new NutritionService();

const fitnessSystemMessage = {
  role: "system",
  content: "You are a helpful, knowledgeable, and friendly fitness coach. You provide personalized fitness advice, including nutrition plans based on the user's goals and fitness level."
};

const detectNutritionQuery = (userMessages) => {
  // Logic to detect if the user's query is related to nutrition
  // For example, check if any of the messages contain keywords related to nutrition
  // Return true if a nutrition query is detected, false otherwise
  return userMessages.some(msg => /nutrition|diet|calories|meal/i.test(msg));
};

const getChatResponse = async (userMessages) => {
  const messages = [fitnessSystemMessage, ...userMessages.map(content => ({ role: 'user', content }))];
  
  try {
    // Detect if the user's query is related to nutrition
    const isNutritionQuery = detectNutritionQuery(userMessages);

    if (isNutritionQuery) {
      // Handle nutrition queries
      const nutritionResponse = await nutritionService.handleNutritionQuery(userMessages);
      return [nutritionResponse];
    } else {
      // For non-nutrition queries, proceed with regular chat response from OpenAI
      const chatResponse = await client.getChatCompletions("roseblunts-gpt-deployment", messages);
      if (!chatResponse || !chatResponse.choices) {
        throw new Error('Invalid response from OpenAI API');
      }
      return chatResponse.choices.map(choice => choice.message.content);
    }
  } catch (err) {
    console.error('Error in getChatResponse:', err);
    throw err; // Re-throw the error to be caught in the route handler
  }
};

module.exports = { getChatResponse };
