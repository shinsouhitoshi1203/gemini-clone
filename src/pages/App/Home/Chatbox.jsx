import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// styling
import "./../../../assets/scss/pages/Home/_ChatBox.scss";
// database
import { checkExistance, loadChat, sendMessage } from "../../../db";
// components
import ChatHistory from "../../../components/Chat/List";
// hooks
import useUserChat, { convert, get } from "../../../hooks/zustand/userChat";
import useGlobal from "../../../hooks/zustand/global";
import send, { gpt } from "../../../config";
import useChat from "../../../hooks/zustand/chat";
import actions, { status } from "../../../code/controls";
//forceRender,
//forceRenderWithID

function forceRender(chats) {
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

function Chatbox() {
	const chatBoxRef = useRef(false);
	const chatBoxRef2 = useRef(false);

	// for navigation in case of error
	const navigate = useNavigate();

	const userID = useGlobal((state) => state.currentUser);
	const { conversation: chatID } = useParams();

	const chatList = useGlobal((state) => state.user.history);

	//////////////////////////////////////////////////
	const setChat = useUserChat((state) => state.setChat);
	const pushChat = useUserChat((state) => state.pushChat);
	// const chats = useUserChat((state) => state.chats);
	// const { prepare, stop } = useChat((state) => state.actions);
	/////////////////////////////////////////////////

	// this useEffect will be called when the chatbox is first loaded
	useEffect(() => {
		if (chatBoxRef.current) return;

		// If this hasnt been in the local state, well check the db
		async function retrieve(userID) {
			if (await checkExistance(chatID, chatList, userID)) {
				try {
					await loadChat(chatID, userID, (chatData) => {
						if (chatData == "") chatData = {};
						setChat(chatID, chatData);
					});
				} catch (error) {
					console.log(error);
					navigate("/app");
				}
			} else {
				navigate("/app");
			}
		}

		useChat.subscribe(
			(state) => state.live,
			async ({ needQuestion }) => {
				// console.log("sexchat", needQuestion);
				if (!needQuestion) {
					if (userID != "") {
						retrieve(userID);
					} else {
						const sub1 = useGlobal.subscribe(
							(state) => state.currentUser,
							(userID) => {
								if (userID != "") {
									// console.log("needQuestion", userID);
									retrieve(userID);
									sub1();
								}
							}
						);
					}
				}
			},
			{ fireImmediately: true }
		);

		chatBoxRef.current = true;
	}, []);

	// this useEffect will be called when there is a new requested question
	useEffect(() => {
		const controller = new AbortController();
		if (chatBoxRef2.current) {
			controller.abort();
			return;
		}
		async function sendReq(configChat, questionQuery, chatID) {
			//console.log(configChat.history);
			try {
				new Promise((resolve) => {
					const response = gpt(configChat, questionQuery);
					resolve(response);
				})
					.then((response) => {
						sendMessage(pushChat, chatID, response, "model");
					})
					.catch((error) => {
						throw new Error(error);
					});
			} catch (error) {
				console.error(error);
			}
		}
		const sub = useChat.subscribe(
			(state) => state.live,
			async ({ needQuestion, questionQuery, newID: chatID }) => {
				if (needQuestion && questionQuery) {
					if (chatID != "" && !status.chat.ask) {
						sendMessage(pushChat, chatID, questionQuery, "user");
						const currentChats = get.gemini();

						const configChat = {
							context: "",
							history: [...currentChats]
						};
						status.chat.ask = true;
						if (!status.chat.answer) {
							await sendReq(configChat, questionQuery, chatID);
							actions.finish.asking();
							status.chat.answer = true;
						}
					}
				}
			},
			{ fireImmediately: true }
		);
		chatBoxRef2.current = true;
		return () => {};
	}, []);

	// this useEffect will be called for updating the state in navigate();

	return (
		<div className="ChatBox">
			<ChatHistory />
		</div>
	);
}
export default Chatbox;
