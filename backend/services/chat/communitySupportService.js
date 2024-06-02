const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const { openaiApiKey, openaiEndpoint } = require('../../config/keys');

// Initialize OpenAI client
const client = new OpenAIClient(openaiEndpoint, new AzureKeyCredential(openaiApiKey));

class CommunitySupportService {
    async handleCommunityQuery(userMessages) {
        try {
            const query = userMessages[userMessages.length - 1]; // Assuming the last message is the user's query
            const communityResponse = await this.generateCommunityResponse(query);
            return communityResponse;
        } catch (err) {
            console.error(`Error handling community query: ${err}`);
            throw err;
        }
    }

    async generateCommunityResponse(query) {
        try {
            // Call the OpenAI API to generate a community support response based on the user's query
            const chatResponse = await client.getChatCompletions("roseblunts-gpt-deployment", [
                { role: "system", content: "You are a supportive community member." },
                { role: "user", content: query }
            ]);
    
            if (!chatResponse || !chatResponse.choices || chatResponse.choices.length === 0) {
                throw new Error('Invalid response from OpenAI API');
            }
    
            return chatResponse.choices[0].message.content;
        } catch (error) {
            console.error('Error in generateCommunityResponse:', error.message);
            throw error;
        }
    }
}
    
module.exports = CommunitySupportService;
