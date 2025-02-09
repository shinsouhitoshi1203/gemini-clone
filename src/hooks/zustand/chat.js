import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import useUserChat from "./userChat";

// useChat :: chat status

const GEMINI_PREPARE = {
	allowLoading: true,
	allowAnimation: false,
	mustStop: false,
	allowForceStop: true
};
const GEMINI_READY = {
	allowLoading: false,
	allowAnimation: true,
	allowForceStop: true,
	mustStop: false
};
const GEMINI_FINISH = {
	allowLoading: false,
	allowAnimation: false,
	allowForceStop: false,
	mustStop: false
};
const GEMINI_STOP_RESPONSING = {
	allowForceStop: false,
	allowAnimation: false,
	mustStop: true
};
const useChat = create(
	subscribeWithSelector((set, get) => {
		return {
			// 24/7 state bruh
			live: {
				newID: "",
				needQuestion: false,
				questionQuery: "",
				getContent() {
					return useUserChat.getState().chats;
				}
			},

			process: false,
			hasAsked: false,
			hasAnswered: false,
			responseForTopic: "",

			animationID: "",

			allowAnimation: true,
			allowLoading: false,
			mustStop: false,
			allowForceStop: false,

			// temporarily keep them to avoid bugs
			loadingChatID: "",
			recent: "",
			response: "",
			allowChat: false
		};
	})
);

export default useChat;
export { GEMINI_PREPARE, GEMINI_READY, GEMINI_FINISH, GEMINI_STOP_RESPONSING };
