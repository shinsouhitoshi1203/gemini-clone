import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import useUserChat from "./userChat";

// useChat :: chat status

const GEMINI_PREPARE = (input) => ({
	recent: input,
	allowChat: true,
	response: "",
	allowLoading: true,
	allowAnimation: false,
	mustStop: false,
	allowForceStop: false
});
const GEMINI_READY = (message) => ({
	response: message,
	allowLoading: false,
	allowAnimation: true,
	allowForceStop: true
});
const GEMINI_FINISH = {
	allowAnimation: false,
	allowForceStop: false,
	mustStop: false
};
const GEMINI_STOP_RESPONSING = {
	allowForceStop: false,
	allowAnimation: false,
	mustStop: true,
	response: ""
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

			hasAsked: false,
			hasAnswered: false,

			// temporarily keep them to avoid bugs
			loadingChatID: "",
			recent: "",
			response: "",
			allowChat: false,
			allowAnimation: true,
			allowLoading: false,
			mustStop: false,
			allowForceStop: false,
			actions: {
				prepare(input) {
					set(GEMINI_PREPARE(input));
				},
				ready(message) {
					if (message) {
						set(GEMINI_READY(message));
					} else {
						throw new Error("breh");
					}
				},
				finish() {
					set((state) => {
						if (!state.mustStop) {
							return GEMINI_FINISH;
						} else {
							return {};
						}
					});
				},
				stop() {
					set((state) => {
						if (state.allowAnimation) {
							return GEMINI_STOP_RESPONSING;
						} else {
							return {};
						}
					});
				}
			}
		};
	})
);

export default useChat;
