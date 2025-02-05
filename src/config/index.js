import { generateModel, generationConfig } from "./gemini";

// main file for the gemini-clone app
export async function gpt(config, message) {
	const { context, history } = config;
	const model = generateModel(context);
	try {
		const chatSession = model.startChat({
			generationConfig,
			//cachedContent: true,
			contents: history
		});

		const result = await chatSession.sendMessage(message);

		return result.response.text();
	} catch (error) {
		throw new Error(error);
	}
}

export default async function send(configChat, question, callback = () => {}) {
	try {
		const res = await gpt(configChat, question);
		callback(res);
		return;
	} catch (error) {
		throw new Error(error);
	}
}
