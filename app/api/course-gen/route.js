const OpenAI = require("openai-edge");
const { OpenAIStream, StreamingTextResponse } = require("ai");

const configuration = new OpenAI.Configuration({
        apiKey: "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" // Use an environment variable for the API key
});

const openai = new OpenAI.OpenAIApi(configuration);

// POST api/analyzeImage
async function POST(request) {
        const { text } = await request.json();
        
        const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo-0125",
                stream: true,
                max_tokens: 4096, // No max tokens: super short / cut off response.
                messages: [
                        {
                                role: "user",
                                content: [
                                        { type: "text", text },
                                ]
                        }
                ]
        });

        const stream = OpenAIStream(response);

        return new StreamingTextResponse(stream);
}

module.exports = { POST };
