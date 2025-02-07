"use strict";
import { newChat } from "../db";
import useChat from "../hooks/zustand/chat";
import useGlobal from "../hooks/zustand/global";
import useUserChat from "../hooks/zustand/userChat";

let userID = "";

const { pushHistory } = useGlobal.getState();

const unsubHard = useGlobal.subscribe(
	(state) => state.currentUser,
	(user) => {
		userID = user;
		if (userID) unsubHard();
	}
);
// basic instructions
const status = {
	set(needQuestion, questionQuery, newID) {
		useChat.setState(() => ({
			live: { needQuestion, questionQuery, newID }
		}));
	},
	chat: {
		reset() {
			useChat.setState(() => ({ hasAsked: false, hasAnswered: false }));
		},
		get ask() {
			return useChat.getState().hasAsked;
		},
		get answer() {
			return useChat.getState().hasAnswered;
		},
		set ask(hasAsked = false) {
			useChat.setState(() => ({ hasAsked }));
		},
		set answer(hasAnswered = false) {
			useChat.setState(() => ({ hasAnswered }));
		}
	}
};
const chats = {
	clear() {
		useUserChat.setState(() => ({ chats: {} }));
	},
	get current() {},
	current: {
		setID(ID) {
			if (!ID) return;
			useUserChat.setState(() => {
				return { current: ID };
			});
		}
	}
};

// actions

const actions = {
	reset(navigate, prune) {
		status.set(false, "", "");
		prune("conversation");
		navigate("/app", { replace: true });
		chats.clear();
		chats.current.setID("");
		status.chat.reset();
	},
	push: {
		historyID() {},
		conversation(input, ID, fromExisted = false) {
			if (ID) {
				status.set(true, input, ID);
				if (fromExisted) chats.current.setID(ID);
			}
		},
		request(input, navigate, chatID = "") {
			status.chat.reset();
			try {
				if (!chatID) {
					const ID = window.crypto.randomUUID();
					newChat(ID, userID, () => {
						this.conversation(input, ID);
						navigate("/app/" + ID, { replace: true });
						pushHistory(ID);
					});
				} else {
					this.conversation(input, chatID, true);
				}
			} catch (error) {
				throw new Error(error);
			}
		}
	},

	finish: {
		asking() {
			status.set(false, "", "");
			// reset the received state
		}
	},
	check: {
		hasAsked() {
			return useChat.getState().hasAsked;
		},
		hasAnswered() {
			return useChat.getState().hasAnswered;
		}
	},
	stop() {}
};

export default actions;
export { chats, status };
