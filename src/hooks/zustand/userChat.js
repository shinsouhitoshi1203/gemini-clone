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
				const { context, list, user } = data;

				set({
					current: id,
					context,
					chats: list
				});
			},
			pushChat(id, data, role) {
				set((state) => {
					const messageObject = renderMessage(id, data, role);
					const newChat = state.chats.slice();
					newChat.push(messageObject);
					return { chats: newChat };
				});
			}
		};
	})
);
export default useUserChat;
