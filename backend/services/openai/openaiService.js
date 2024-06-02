// openaiService.js

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const { openaiApiKey, openaiEndpoint } = require('../../config/keys');
const NutritionService = require('../chat/nutritionService');
const CardioService = require('../chat/cardioService');
const CommunitySupportService = require('../chat/communitySupportService');
const FitnessTrackingService = require('../chat/fitnessTrackingService');
const GoalSettingService = require('../chat/goalSettingService');
const HydrationService = require('../chat/hydrationService');
const InjuryPreventionService = require('../chat/injuryPreventionService');
const RecoveryService = require('../chat/recoveryService');
const SleepService = require('../chat/sleepService');
// Initialize OpenAI client
const client = new OpenAIClient(openaiEndpoint, new AzureKeyCredential(openaiApiKey));
const nutritionService = new NutritionService();
const cardioService = new CardioService();
const communitySupportService = new CommunitySupportService();
const fitnessTrackingService = new FitnessTrackingService();
const goalSettingService = new GoalSettingService();
const hydrationService = new HydrationService();
const injuryPreventionService = new InjuryPreventionService();
const recoveryService = new RecoveryService();
const sleepService = new SleepService();

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

const detectGoalSettingQuery = (userMessages) => {
    const keywords = ['goal', 'target', 'objective', 'aim'];
    return userMessages.some(message => keywords.some(keyword => message.toLowerCase().includes(keyword)));
};

const detectHydrationQuery = (userMessages) => {
    const keywords = ['hydration', 'water intake', 'drink water'];
    return userMessages.some(message => keywords.some(keyword => message.toLowerCase().includes(keyword)));
};

const detectInjuryPreventionQuery = (userMessages) => {
    const keywords = ['injury', 'prevent injury', 'avoid injury', 'injury prevention'];
    return userMessages.some(message => keywords.some(keyword => message.toLowerCase().includes(keyword)));
};

const detectRecoveryQuery = (userMessages) => {
    const keywords = ['recovery', 'rest', 'recover', 'recovering'];
    return userMessages.some(message => keywords.some(keyword => message.toLowerCase().includes(keyword)));
};

const detectSleepQuery = (userMessages) => {
    const keywords = ['sleep', 'rest', 'bedtime', 'nap'];
    return userMessages.some(message => keywords.some(keyword => message.toLowerCase().includes(keyword)));
};

const getChatResponse = async (userMessages) => {
    const messages = [fitnessSystemMessage, ...userMessages.map(content => ({ role: 'user', content }))];

    try {
        const isNutritionQuery = detectNutritionQuery(userMessages);
        const isCardioQuery = detectCardioQuery(userMessages);
        const isCommunityQuery = detectCommunityQuery(userMessages);
        const isTrackingQuery = detectTrackingQuery(userMessages);
        const isGoalSettingQuery = detectGoalSettingQuery(userMessages);
        const isHydrationQuery = detectHydrationQuery(userMessages);
        const isInjuryPreventionQuery = detectInjuryPreventionQuery(userMessages);
        const isRecoveryQuery = detectRecoveryQuery(userMessages); // Add detection for recovery query
        const isSleepQuery = detectSleepQuery(userMessages);

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
        } else if (isGoalSettingQuery) { 
            const goalSettingResponse = await goalSettingService.handleGoalSettingQuery(userMessages);
            return [goalSettingResponse];
        } else if (isHydrationQuery) {
            const hydrationResponse = await hydrationService.handleHydrationQuery(userMessages);
            return [hydrationResponse];
        } else if (isInjuryPreventionQuery) {
            const injuryPreventionResponse = await injuryPreventionService.handleInjuryPreventionQuery(userMessages);
            return [injuryPreventionResponse];
        } else if (isRecoveryQuery) {
            const recoveryResponse = await recoveryService.handleRecoveryQuery(userMessages);
            return [recoveryResponse];
        } else if (isSleepQuery) {
            const sleepResponse = await sleepService.handleSleepQuery(userMessages);
            return [sleepResponse];
        
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
