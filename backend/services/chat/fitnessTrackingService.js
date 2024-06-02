// fitnessTrackingService.js

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const { openaiApiKey, openaiEndpoint } = require('../../config/keys');

// Initialize OpenAI client
const client = new OpenAIClient(openaiEndpoint, new AzureKeyCredential(openaiApiKey));

class FitnessTrackingService {
    async handleFitnessTrackingQuery(userMessages) {
        try {
            const query = userMessages[userMessages.length - 1]; // Assuming the last message is the user's query
            const trackingResponse = await this.generateFitnessTrackingResponse(query);
            return trackingResponse;
        } catch (err) {
            console.error(`Error handling fitness tracking query: ${err}`);
            throw err;
        }
    }

    async generateFitnessTrackingResponse(query) {
        try {
            // Call the OpenAI API to generate a fitness tracking response based on the user's query
            const chatResponse = await client.getChatCompletions("roseblunts-gpt-deployment", [
                { role: "system", content: "You are a helpful fitness tracking expert." },
                { role: "user", content: query }
            ]);
    
            if (!chatResponse || !chatResponse.choices || chatResponse.choices.length === 0) {
                throw new Error('Invalid response from OpenAI API');
            }
    
            return chatResponse.choices[0].message.content;
        } catch (error) {
            console.error('Error in generateFitnessTrackingResponse:', error.message);
            throw error;
        }
    }
}

module.exports = FitnessTrackingService;
