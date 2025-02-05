import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import useGlobal from "./global";
const DEFAULT = {
	history: [],
	chats: [],
	currentConversation: ""
};
function renderMessage(id, data, role) {
	// will change when having implemeted user auth + image
	return {
		id,
		role,
		parts: [{ text: data }]
	};
}
const useUserChat = create(
	subscribeWithSelector((set, get) => {
		return {
			current: "",
			context: "",
			chats: [],
			reset() {
				set(DEFAULT);
			},
			setChat(id, data) {
				let { context, list, user } = data;
				if (typeof list == "string") {
					list = [];
				}
				set({
					current: id,
					context,
					chats: list
				});
			},
			pushChat(id, data, role) {
				const messageObject = renderMessage(id, data, role);
				set((state) => {
					const newChat = [...state.chats, messageObject];
					console.log("Old store:\n", state.chats);
					console.log("New store:\n", newChat);
					return { chats: newChat };
				});
			}
		};
	})
);
export default useUserChat;
