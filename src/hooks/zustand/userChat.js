import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import useGlobal from "./global";
const DEFAULT = () => {
	return {
		context: "",
		chats: new Map(),
		current: ""
	};
};
function renderMessage(id, data, role) {
	// will change when having implemeted user auth + image
	return {
		id,
		role,
		parts: [{ text: data }]
	};
}
function forceRender(chats) {
	// render into a list of chat objects for gemini.
	const iterableList = Array.from(chats.keys());
	// get the value from key
	const child = (key) => chats.get(key);
	return iterableList.map((key) => {
		return {
			role: child(key).role,
			parts: [{ text: child(key).parts[0].text }]
		};
	});
}
function renderUI(chats) {
	// render into a list of chat objects for gemini.
	// console.log(chats);

	const iterableList = Array.from(chats.keys());
	// get the value from key
	const child = (key) => chats.get(key);
	return iterableList.map((key) => {
		return {
			id: key,
			role: child(key).role,
			parts: [{ text: child(key).parts[0].text }]
		};
	});
}
function entryMap(databaseList) {
	//console.log(databaseList);
	return new Map(Object.entries(databaseList));
	const map = new Map();
	const iterableList = Object.keys(databaseList);
	iterableList.forEach((key) => {
		map.set(key, databaseList[key]);
	});
	return map;
}
const useUserChat = create(
	subscribeWithSelector((set, get) => {
		const chats = new Map();
		return {
			current: "",
			context: "",
			chats,
			reset() {
				set(DEFAULT());
			},
			setChat(id, data) {
				let { context, list, user } = data;
				if (typeof list == "string") {
					list = new Map();
				}
				// console.log(entryMap(list));

				// console.log(
				// 	new Map(Object.entries(list)).get("-OIK_HQVgKGYPqUGT9dH")
				// );
				set({
					current: id,
					context,
					chats: entryMap(list)
				});
			},
			pushChat(id, data, role) {
				// ---------------------------------
				// {messageID:..., role:..., parts: [{text: ...}]}

				const messageObject = renderMessage(id, data, role);
				set((state) => {
					//const newChat = { ...state.chats, messageObject };
					//console.log("Old store:\n", state.chats);
					//console.log("New store:\n", newChat);
					return {
						chats: new Map(state.chats).set(id, messageObject)
					};
				});
			},
			setConversationID(id) {
				set({ current: id });
			}
		};
	})
);
export default useUserChat;
export { forceRender, renderUI, entryMap };
