import {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // vitejs only
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
	model: "gemini-2.0-flash-exp"
});

const generationConfig = {
	temperature: 1.05,
	topP: 0.95,
	topK: 40,
	maxOutputTokens: 8192,
	responseMimeType: "text/plain"
};

async function processGPT(msg) {
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: []
        });
    
        const result = await chatSession.sendMessage(msg);
        return (result.response.text());
    } catch (error) {
        console.dir(error);
    }
}


export default processGPT;