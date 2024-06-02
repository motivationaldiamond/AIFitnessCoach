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
    const keywords = ['nutrition', 'meal', 'diet', 'calories', 'protein', 'carbs', 'fat'];
    return userMessages.some(message => keywords.some(keyword => message.toLowerCase().includes(keyword)));
};

const getChatResponse = async (userMessages) => {
    const messages = [fitnessSystemMessage, ...userMessages.map(content => ({ role: 'user', content }))];
  
    try {
        const isNutritionQuery = detectNutritionQuery(userMessages);

        if (isNutritionQuery) {
            const nutritionResponse = await nutritionService.handleNutritionQuery(userMessages);
            return [nutritionResponse];
        } else {
            const chatResponse = await client.getChatCompletions("roseblunts-gpt-deployment", messages);
            if (!chatResponse || !chatResponse.choices) {
                throw new Error('Invalid response from OpenAI API');
            }
            return chatResponse.choices.map(choice => choice.message.content);
        }
    } catch (err) {
        console.error('Error in getChatResponse:', err);
        throw err;
    }
};

module.exports = { getChatResponse };
