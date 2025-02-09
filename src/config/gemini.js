import {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // vitejs only
const genAI = new GoogleGenerativeAI(apiKey);

export function generateModel(context) {
	return genAI.getGenerativeModel({
		model: "gemini-2.0-flash-exp",
		systemInstruction: context
	});
}

export const generationConfig = {
	temperature: 1.05,
	topP: 0.95,
	topK: 40,
	maxOutputTokens: 8192,
	responseMimeType: "text/plain"
};
export const generationConfig_Topic = {
	temperature: 1,
	topP: 0.95,
	topK: 40,
	maxOutputTokens: 8192,
	responseMimeType: "application/json",
	responseSchema: {
		type: "object",
		properties: {
			topic: {
				type: "string"
			}
		},
		required: ["topic"]
	}
};
const model = generateModel("");

async function processGPT(historydataRequest) {
	try {
		const chatSession = model.startChat({
			generationConfig,
			history: []
		});

		const result = await chatSession.sendMessage(msg);
		return result.response.text();
	} catch (error) {
		console.dir(error);
	}
}

export default processGPT;
