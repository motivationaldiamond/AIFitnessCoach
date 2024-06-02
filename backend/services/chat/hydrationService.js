// hydrationService.js

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const { openaiApiKey, openaiEndpoint } = require('../../config/keys');

// Initialize OpenAI client
const client = new OpenAIClient(openaiEndpoint, new AzureKeyCredential(openaiApiKey));

class HydrationService {
    async handleHydrationQuery(userMessages) {
        try {
            const query = userMessages[userMessages.length - 1]; // Assuming the last message is the user's query
            const hydrationResponse = await this.generateHydrationResponse(query);
            return hydrationResponse;
        } catch (err) {
            console.error(`Error handling hydration query: ${err}`);
            throw err;
        }
    }

    async generateHydrationResponse(query) {
        try {
            // Call the OpenAI API to generate a hydration response based on the user's query
            const chatResponse = await client.getChatCompletions("roseblunts-gpt-deployment", [
                { role: "system", content: "You are a helpful hydration expert." },
                { role: "user", content: query }
            ]);
    
            if (!chatResponse || !chatResponse.choices || chatResponse.choices.length === 0) {
                throw new Error('Invalid response from OpenAI API');
            }
    
            return chatResponse.choices[0].message.content;
        } catch (error) {
            console.error('Error in generateHydrationResponse:', error.message);
            throw error;
        }
    }
}

module.exports = HydrationService;
