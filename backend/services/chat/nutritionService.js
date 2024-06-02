// nutritionService.js

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const { openaiApiKey, openaiEndpoint } = require('../../config/keys');

// Initialize OpenAI client
const client = new OpenAIClient(openaiEndpoint, new AzureKeyCredential(openaiApiKey));

class NutritionService {
    async handleNutritionQuery(userMessages) {
        try {
            const query = userMessages[userMessages.length - 1]; // Assuming the last message is the user's query
            const nutritionResponse = await this.generateNutritionResponse(query);
            return nutritionResponse;
        } catch (err) {
            console.error(`Error handling nutrition query: ${err}`);
            throw err;
        }
    }

    async generateNutritionResponse(query) {
        try {
            // Call the OpenAI API to generate a nutrition response based on the user's query
            const chatResponse = await client.getChatCompletions("roseblunts-gpt-deployment", [
                { role: "system", content: "You are a helpful nutrition expert." },
                { role: "user", content: query }
            ]);
    
            if (!chatResponse || !chatResponse.choices || chatResponse.choices.length === 0) {
                throw new Error('Invalid response from OpenAI API');
            }
    
            return chatResponse.choices[0].message.content;
        } catch (error) {
            console.error('Error in generateNutritionResponse:', error.message);
            throw error;
        }
    }
}
    
module.exports = NutritionService;
