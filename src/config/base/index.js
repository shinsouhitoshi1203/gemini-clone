
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // vitejs only
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp", // ai tools
    systemInstruction: "" // background of the chat
});

const generationConfig = {
    temperature: 1.05,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain"
    // responseMimeType: "application/json",
    // responseSchema: {
    // 	type: "object",
    // 	properties: {
    // 		response_message: {
    // 			type: "string"
    // 		},
    // 		response_action: {
    // 			type: "string"
    // 		}
    // 	},
    // 	required: ["response_message", "response_action"]
    // }
};

export default model;
export { generationConfig };

/* 
    generationConfig :: default 
    history :: defined in another file
    ------------------------------------

    // to start a conversation:
    session = model.startChat({ generationConfig, history })

    // in a conversation, to send request:
    result = await session.sendMessage(<Your message>)

    // view markdown result:
    result.response.text()

*/
