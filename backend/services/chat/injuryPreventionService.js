// injuryPreventionService.js

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const { openaiApiKey, openaiEndpoint } = require('../../config/keys');

// Initialize OpenAI client
const client = new OpenAIClient(openaiEndpoint, new AzureKeyCredential(openaiApiKey));

class InjuryPreventionService {
    async handleInjuryPreventionQuery(userMessages) {
        try {
            const query = userMessages[userMessages.length - 1]; // Assuming the last message is the user's query
            const injuryPreventionResponse = await this.generateInjuryPreventionResponse(query);
            return injuryPreventionResponse;
        } catch (err) {
            console.error(`Error handling injury prevention query: ${err}`);
            throw err;
        }
    }

    async generateInjuryPreventionResponse(query) {
        try {
            // Call the OpenAI API to generate an injury prevention response based on the user's query
            const chatResponse = await client.getChatCompletions("roseblunts-gpt-deployment", [
                { role: "system", content: "You are a helpful injury prevention expert." },
                { role: "user", content: query }
            ]);
    
            if (!chatResponse || !chatResponse.choices || chatResponse.choices.length === 0) {
                throw new Error('Invalid response from OpenAI API');
            }
    
            return chatResponse.choices[0].message.content;
        } catch (error) {
            console.error('Error in generateInjuryPreventionResponse:', error.message);
            throw error;
        }
    }
}

module.exports = InjuryPreventionService;
