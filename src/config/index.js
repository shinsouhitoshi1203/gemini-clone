import actions from "../code/controls";
import {
	generateModel,
	generationConfig,
	generationConfig_Topic
} from "./gemini";

// main file for the gemini-clone app
export async function gpt(config, message) {
	const { context, history } = config;

	const historyNew = Array.from(history).slice();
	historyNew.pop();
	const model = generateModel(context);
	try {
		const sessionConfig = {
			generationConfig,
			history: [...historyNew]
		};
		const chatSession = model.startChat(sessionConfig);
		//console.log(sessionConfig.history);
		const result = await chatSession.sendMessage(message);
		actions.push.answer(result.response.text());
		return result.response.text();
	} catch (error) {
		throw new Error(error);
	}
}
export async function topic(question) {
	const historyNew = Array.from(history).slice();
	historyNew.pop();
	const model = generateModel(
		"Generate a topic from an user's question, no markdown formatting"
	);
	try {
		const sessionConfig = {
			generationConfig: generationConfig_Topic,
			history: []
		};
		const chatSession = model.startChat(sessionConfig);
		const result = await chatSession.sendMessage(question);
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
