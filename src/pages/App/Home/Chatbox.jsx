import { memo, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// scripts
import { gpt } from "../../../config";
import actions, { status, chats } from "../../../code/controls";

// styling
import "./../../../assets/scss/pages/Home/_ChatBox.scss";
// database
import { checkExistance, loadChat, sendMessage } from "../../../db";
// components
import ChatHistory from "../../../components/Chat/List";
// stores
import useUserChat, { get } from "../../../hooks/zustand/userChat";
import useGlobal from "../../../hooks/zustand/global";
import useChat from "../../../hooks/zustand/chat";
import interact from "../../../code/interact";
import useInteract from "../../../hooks/zustand/interact";
import { ScrollProvider } from "./index";
import { setTopic } from "../../../db";
import WaitForAnswer from "../../../components/Chat/Answer/WaitForAnswer";
function Chatbox() {
	const displayRef = useContext(ScrollProvider);
	const chatBoxRef = useRef(false);
	const chatBoxRef2 = useRef(false);
	const chatBoxRef3 = useRef(false);
	const divRef = useRef();
	// for navigation in case of error
	const navigate = useNavigate();
	// for getting the current user
	const userID = useGlobal((state) => state.currentUser);
	// for getting the chatID from the url
	const { conversation: chatID } = useParams();
	// for getting the chat history from the global state
	const chatList = useGlobal((state) => state.user.history);

	//////////////////////////////////////////////////
	const setChat = useUserChat((state) => state.setChat);
	const pushChat = useUserChat((state) => state.pushChat);
	/////////////////////////////////////////////////
	const padding = useInteract((state) => state.scroll.padding);

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
					actions.reset(navigate);
				}
			} else {
				navigate("/app");
			}
		}

		useChat.subscribe(
			(state) => state.live,
			async ({ needQuestion }) => {
				if (!needQuestion) {
					if (userID != "") {
						retrieve(userID);
					} else {
						const sub1 = useGlobal.subscribe(
							(state) => state.currentUser,
							(userID) => {
								if (userID != "") {
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
			// if (status.chat.answer) return;
			try {
				new Promise((resolve) => {
					const response = gpt(configChat, questionQuery);
					resolve(response);
				})
					.then((response) => {
						const messageID = sendMessage(
							pushChat,
							chatID,
							response,
							"model",
							status.chat.ready()
						);
						return messageID;
					})
					.then((messageID) => {
						interact.scroll.trigger(false);
						const chatTopic = chats.chatTopic;
						if (chatTopic.newTopic) {
							setTopic(chatID, userID, chatTopic.name);
							chats.topic.stop();
						}
						return messageID;
					})
					.catch((error) => {
						throw new Error(error);
					})
					.finally(() => {
						// set any state once the final message has been sent
						status.chat.wait = false;
					});
			} catch (error) {
				console.error(error);
			}
		}
		useChat.subscribe(
			(state) => state.live,
			async ({ needQuestion, questionQuery, newID: chatID }) => {
				if (needQuestion && questionQuery) {
					if (chatID != "") {
						sendMessage(pushChat, chatID, questionQuery, "user");

						// once the message has been sent, we will trigger the scroll
						interact.scroll.trigger(true);
						const currentChats = get.gemini();
						const configChat = {
							context: "",
							history: [...currentChats]
						};
						if (!status.chat.answer) {
							status.chat.answer = true;
							await sendReq(configChat, questionQuery, chatID);
							actions.finish.asking();
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
	useEffect(() => {
		if (chatBoxRef3.current) return;
		useInteract.subscribe(
			(state) => state.scroll.need,
			() => {
				const container = displayRef.current;
				const latest = divRef.current.querySelector(
					"div.ChatBox__Chat:last-child"
				);
				const second = divRef.current.querySelector(
					"div.ChatBox__Chat:nth-last-child(2)"
				);
				latest.scrollIntoView({ behavior: "smooth" });
				let newPadding =
					container.offsetHeight - latest.offsetHeight + 200;
				if (latest.matches(".ChatBox__Chat-Answer")) {
					newPadding = newPadding - second.offsetHeight - 25 + 200;
				}
				interact.scroll.padding = newPadding;
			}
		);
		chatBoxRef3.current = true;
		return () => {};
	}, []);

	return (
		<div
			className="ChatBox"
			style={{ paddingBottom: padding }}
			ref={divRef}
		>
			<ChatHistory />
			<WaitForAnswer />
		</div>
	);
}
export default memo(Chatbox);
