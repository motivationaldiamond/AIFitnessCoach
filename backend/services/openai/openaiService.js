// openaiService.js

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const { openaiApiKey, openaiEndpoint } = require('../../config/keys');
const NutritionService = require('../chat/nutritionService');
const CardioService = require('../chat/cardioService');
const CommunitySupportService = require('../chat/communitySupportService');
const FitnessTrackingService = require('../chat/fitnessTrackingService');
const GoalSettingService = require('../chat/goalSettingService'); // Added GoalSettingService

// Initialize OpenAI client
const client = new OpenAIClient(openaiEndpoint, new AzureKeyCredential(openaiApiKey));
const nutritionService = new NutritionService();
const cardioService = new CardioService();
const communitySupportService = new CommunitySupportService();
const fitnessTrackingService = new FitnessTrackingService();
const goalSettingService = new GoalSettingService(); // Instantiated GoalSettingService

const fitnessSystemMessage = {
    role: "system",
    content: "You are a helpful, knowledgeable, and friendly fitness coach. You provide personalized fitness advice, including nutrition plans based on the user's goals and fitness level."
};

const detectNutritionQuery = (userMessages) => {
    const keywords = ['nutrition', 'meal', 'diet', 'calories', 'protein', 'carbs', 'fat'];
    return userMessages.some(message => keywords.some(keyword => message.toLowerCase().includes(keyword)));
};

const detectCardioQuery = (userMessages) => {
    const keywords = ['cardio', 'running', 'jogging', 'cycling', 'swimming'];
    return userMessages.some(message => keywords.some(keyword => message.toLowerCase().includes(keyword)));
};

const detectCommunityQuery = (userMessages) => {
    const keywords = ['support', 'help', 'motivation', 'encouragement', 'advice'];
    return userMessages.some(message => keywords.some(keyword => message.toLowerCase().includes(keyword)));
};

const detectTrackingQuery = (userMessages) => {
    const keywords = ['track', 'progress', 'fitness', 'workout'];
    return userMessages.some(message => keywords.some(keyword => message.toLowerCase().includes(keyword)));
};

const detectGoalSettingQuery = (userMessages) => { // Added detectGoalSettingQuery function
    const keywords = ['goal', 'target', 'objective', 'aim'];
    return userMessages.some(message => keywords.some(keyword => message.toLowerCase().includes(keyword)));
};

const getChatResponse = async (userMessages) => {
    const messages = [fitnessSystemMessage, ...userMessages.map(content => ({ role: 'user', content }))];

    try {
        const isNutritionQuery = detectNutritionQuery(userMessages);
        const isCardioQuery = detectCardioQuery(userMessages);
        const isCommunityQuery = detectCommunityQuery(userMessages);
        const isTrackingQuery = detectTrackingQuery(userMessages);
        const isGoalSettingQuery = detectGoalSettingQuery(userMessages); // Added check for goal setting query

        if (isNutritionQuery) {
            const nutritionResponse = await nutritionService.handleNutritionQuery(userMessages);
            return [nutritionResponse];
        } else if (isCardioQuery) {
            const cardioResponse = await cardioService.handleCardioQuery(userMessages);
            return [cardioResponse];
        } else if (isCommunityQuery) {
            const communityResponse = await communitySupportService.handleCommunityQuery(userMessages);
            return [communityResponse];
        } else if (isTrackingQuery) {
            const trackingResponse = await fitnessTrackingService.handleFitnessTrackingQuery(userMessages);
            return [trackingResponse];
        } else if (isGoalSettingQuery) { // Added handling for goal setting query
            const goalSettingResponse = await goalSettingService.handleGoalSettingQuery(userMessages);
            return [goalSettingResponse];
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
