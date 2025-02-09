"use strict";
import { topic } from "../config";
import { newChat, setTopic, tickle } from "../db";
import useChat, {
	GEMINI_FINISH,
	GEMINI_PREPARE,
	GEMINI_READY,
	GEMINI_STOP_RESPONSING
} from "../hooks/zustand/chat";
import useGlobal from "../hooks/zustand/global";
import useUserChat from "../hooks/zustand/userChat";
import interact from "./interact";

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
			useChat.setState(() => ({
				hasAsked: false,
				hasAnswered: false,
				responseForTopic: "",
				process: false,
				animationID: ""
			}));
		},
		// gettings
		get ask() {
			return useChat.getState().hasAsked;
		},
		get answer() {
			return useChat.getState().hasAnswered;
		},
		get wait() {
			return useChat.getState().process;
		},
		get needStop() {
			return useChat.getState().mustStop;
		},
		get answerID() {
			return useChat.getState().animationID;
		},
		get animate() {
			return useChat.getState().allowAnimation;
		},

		// settings
		set ask(hasAsked = false) {
			useChat.setState(() => ({ hasAsked }));
		},
		set answer(hasAnswered = false) {
			useChat.setState(() => ({ hasAnswered }));
		},
		set wait(value = true) {
			useChat.setState(() => ({ process: value }));
		},
		// actions
		push(answerID) {
			useChat.setState(() => ({ animationID: answerID }));
		},
		prepare() {
			useChat.setState(() => GEMINI_PREPARE);
		},
		ready() {
			return (answerID) => {
				useChat.setState(() => ({
					...GEMINI_READY,
					animationID: answerID
				}));
			};
		},
		finish() {
			useChat.setState(() => GEMINI_FINISH);
		},
		stop() {
			useChat.setState(() => GEMINI_STOP_RESPONSING);
		},
		get state() {
			const { allowAnimation, allowLoading, mustStop, allowForceStop } =
				useChat.getState();
			return { allowAnimation, allowLoading, mustStop, allowForceStop };
		}
	}
};

const chats = {
	topic: {
		get(question) {
			let chatTopic = "";
			topic(question)
				.then((answer) => {
					const db = JSON.parse(answer);
					const { topic } = db;
					chatTopic = topic;
				})
				.catch((error) => {
					chatTopic = question[0].toUpperCase() + question.slice(1);
					console.error(error);
				})
				.finally(() => {
					chats.chatTopic = chatTopic;
				});
			return chatTopic;
		},
		stop() {
			useUserChat.setState((state) => ({
				topic: { ...state.topic, newTopic: false }
			}));
		}
	},
	get chatTopic() {
		return useUserChat.getState().topic;
	},
	clear() {
		useUserChat.setState(() => ({ chats: {} }));
	},
	set chatTopic(topic) {
		useUserChat.setState(() => ({
			topic: { newTopic: true, name: topic }
		}));
	},
	current: {
		setID(ID) {
			if (!ID) return;
			useUserChat.setState(() => {
				return { current: ID };
			});
		},
		get() {
			return useUserChat.getState().current;
		}
	},
	reset() {
		useUserChat.getState().reset();
		// tickle the database
	}
};

// actions

const actions = {
	reset(navigate, prune = () => {}) {
		prune("conversation");
		status.set(false, "", "");
		status.chat.reset();
		chats.clear();
		chats.reset();
		chats.current.setID("");
		interact.sidebar.toggle(false);
		status.chat.reset();
		navigate("/app", { replace: true });
	},
	push: {
		historyID() {},
		answer(response) {
			useChat.setState(() => ({ responseForTopic: response }));
		},
		conversation(input, ID, fromExisted = false) {
			if (ID) {
				status.set(true, input, ID);
				if (fromExisted) chats.current.setID(ID);
			}
		},
		request(input, navigate, chatID = "") {
			status.chat.reset();
			// trigger scrolling
			try {
				if (!chatID) {
					// press wait
					// generate a random ID
					const ID = window.crypto.randomUUID();
					newChat(ID, userID, input, () => {
						this.conversation(input, ID);
						navigate("/app/" + ID, { replace: true });
						new Promise((resolve) => {
							const topic = chats.topic.get(input);
							resolve(topic);
						}).then((topic) => {
							pushHistory(ID, topic);
						});
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

	stop() {
		status.chat.stop();
		tickle(
			chats.current.get(),
			status.chat.answerID,
			userID,
			"cancelled",
			true
		);
		status.chat.wait = false;
		// reset from id
	}
};

export default actions;
export { chats, status };
