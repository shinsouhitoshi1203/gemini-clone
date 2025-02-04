import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import useGlobal from "./global";
const DEFAULT = {
	history: [],
	chats: [],
	currentConversation: ""
};
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
			pushChat() {}
		};
	})
);
export default useUserChat;
