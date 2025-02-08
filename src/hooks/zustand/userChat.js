import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const DEFAULT = {
	current: "",
	context: "",
	chats: {},
	topic: {
		newTopic: false,
		name: ""
	}
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

function forceRender(chats) {
	return convert.toGemini(chats);
	/////////////////////////////////////////////////
}

function renderUI(chats) {
	// render into a list of chat objects for gemini.
	// console.log(chats);
	return convert.toUI(chats);
	/////////////////////////////////////////////////
}

const useUserChat = create(
	subscribeWithSelector((set, get) => {
		return {
			current: "",
			context: "",
			chats: {},
			topic: {
				newTopic: false,
				name: ""
			},
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
export { forceRender, renderUI, get };
