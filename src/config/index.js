import { generateModel, generationConfig } from "./gemini";

// main file for the gemini-clone app
export default async function gpt(config, message) {
	const { context, history } = config;
	const model = generateModel(context);
	try {
		const chatSession = model.startChat({
			generationConfig,
			history
		});

		const result = await chatSession.sendMessage(message);
		return result.response.text();
	} catch (error) {
		console.error(error);
	}
}
