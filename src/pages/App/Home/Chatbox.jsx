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
	const chats = useUserChat((state) => state.chats);
	const { prepare, stop } = useChat((state) => state.actions);
	/////////////////////////////////////////////////

	// this useEffect will be called when the chatbox is first loaded
	useEffect(() => {
		if (chatBoxRef.current) return;

		// If this hasnt been in the local state, well check the db
		async function retrieve(userID) {
			if (await checkExistance(chatID, chatList, userID)) {
				try {
					await loadChat(chatID, userID, (chatData) => {
						// console.log(JSON.stringify(chatData));
						if (chatData == "") chatData = {};
						// console.log(chatData);

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

	useUserChat.subscribe(
		(state) => state.chats,
		(chats) => {
			// console.log(chats);
			//console.log(forceRender(chats));
		}
	);
	// this useEffect will be called when there is a new requested question
	useEffect(() => {
		if (chatBoxRef2.current) return;
		//console.log("paramssss >>>>>     ", chatID);

		async function sendReq(configChat, questionQuery, chatID) {
			//console.log(configChat.history);
			try {
				// console.log(configChat.history);
				new Promise((resolve) => {
					console.log("What would they send to Gemini");
					console.log(convert.toPlainMsg(configChat.history));
					// toPlain
					resolve();
				})
					.then(() => {
						return new Promise((resolve) => {
							const response = gpt(configChat, questionQuery);
							resolve(response);
						});
					})
					.then((response) => {
						sendMessage(
							pushChat,
							chatID,
							userID,
							response,
							"model"
						);
					})
					.catch((error) => {
						throw new Error(error);
					});
				//sendMessage(pushChat, chatID, userID, response, "model");
			} catch (error) {
				console.error(error);
			}
		}
		// console.log("Im over here");

		const sub = useChat.subscribe(
			(state) => state.live,
			async ({
				needQuestion,
				resetQuestion,
				questionQuery,
				getContent,
				newID: chatID
			}) => {
				if (needQuestion && questionQuery) {
					if (chatID != "") {
						sendMessage(
							pushChat,
							chatID,
							userID,
							questionQuery,
							"user"
						);
						const currentChats = get.gemini();

						const configChat = {
							context: "",
							history: [...currentChats]
						};
						// console.log("What to send to Gemini :: ID > real");
						// console.log(currentContextWithID);
						// // console.log(currentContext);
						// console.log();
						// view the request that will be sent to gemini
						await sendReq(configChat, questionQuery, chatID);
						resetQuestion();
						//sub1();
					}

					// send request
				}
			},
			{ fireImmediately: true }
		);
		/*
            if (needQuestion) {
                const messageID = window.crypto.randomUUID();
                //pushChat(messageID, state.question, "user");
                sendMessage(pushChat, chatID, userID, state.question, "user");

                // generate request to the server
                const configChat = {
                    context: "",
                    history: forceRender(chats)
                };
                // view the request that will be sent to gemini

                sendReq(configChat);
                setNeedQuestion(false);
                window.history.replaceState({}, "");
                // send request
            } 
        */

		chatBoxRef2.current = true;
		return () => {
			sub();
		};
	}, []);

	// this useEffect will be called for updating the state in navigate();

	return (
		<div className="ChatBox">
			<ChatHistory />
		</div>
	);
}
export default Chatbox;
