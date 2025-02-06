import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import useGlobal from "./global";
const DEFAULT = {
	context: "",
	chats: {},
	current: ""
};
function renderMessage(id, data, role) {
	// will change when having implemeted user auth + image
	return {
		id,
		role,
		parts: [{ text: data }]
	};
}

export const convert = {
	toGemini(listInput) {
		// list input is from firebase;
		// secret/dataStructure.js
		const entries = Object.entries(listInput);
		return entries.map(([, { parts, role }]) => {
			return { parts, role };
		});
	},
	toUI(listInput) {
		// list input is from zustand
		const entries = Object.entries(listInput);
		return entries.map(([, content]) => {
			return { ...content };
		});
	},
	toSee(listInput) {
		// list input is from zustand
		// for debugging FROM CHATS STORE
		// secret/dataStructure.js
		const entries = Object.entries(listInput);
		return entries.map(([, { parts, role }]) => {
			const [text] = parts;
			return { ...text, role };
		});
	},
	toPlain(listInput) {
		// list input is from zustand
		const entries = Object.entries(listInput);
		return entries.map(([, { parts, role }]) => {
			const [text] = parts;
			return text.text;
		});
	},
	toPlainMsg(listGemini) {
		return listGemini.map(({ parts }) => {
			return parts[0].text;
		});
	}
};

function forceRender2(chats) {
	// render into a list of chat objects for gemini.
	const chatsCurrent = new Map(chats);
	const iterableList = Array.from(chatsCurrent.keys());
	//console.log(iterableList);
	//console.log(chats.entries());

	// get the value from key
	console.log();

	const child = (key) => chatsCurrent.get(key);
	return iterableList.map((key) => {
		return {
			role: child(key).role,
			parts: [{ text: child(key).parts[0].text }]
		};
	});
}

function forceRender(chats) {
	return convert.toGemini(chats);
	/////////////////////////////////////////////////
	const iterableList = forceRenderWithID(chats);
	return iterableList.map(({ id, msg, role }) => {
		return {
			role,
			parts: [{ text: msg }]
		};
	});
}
function forceRenderWithID(chats) {
	// render into a list of chat objects for gemini.
	const chatsCurrent = new Map(chats);
	const iterableList = Array.from(chatsCurrent.keys());
	//console.log(iterableList);
	//console.log(chats.entries());

	// get the value from key
	const child = (key) => chatsCurrent.get(key);
	return iterableList.map((key) => {
		return {
			id: key,
			role: child(key).role,
			msg: child(key).parts[0].text
			//parts: [{ text: child(key).}]
		};
	});
}
function renderUI(chats) {
	// render into a list of chat objects for gemini.
	// console.log(chats);
	return convert.toUI(chats);
	////////////////////////////////
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
		return {
			current: "",
			context: "",
			chats: {},
			reset() {
				set(DEFAULT);
			},
			setChat(id, data) {
				let { context, list, user } = data;
				if (typeof list == "string") {
					list = {};
				}
				JSON.parse(JSON.stringify(list));
				set({
					current: id,
					context,
					chats: JSON.parse(JSON.stringify(list))
				});
			},
			pushChat(id, data, role) {
				const messageObject = renderMessage(id, data, role);
				set((state) => {
					return {
						chats: { ...state.chats, [id]: messageObject }
						//new Map(state.chats).set(id, messageObject)
					};
				});
			},
			setConversationID(id) {
				set({ current: id });
			}
		};
	})
);

const get = {
	gemini() {
		const chats = useUserChat.getState().chats;
		return convert.toGemini(chats);
	}
};

export default useUserChat;
export { forceRender, renderUI, entryMap, forceRenderWithID, get };
