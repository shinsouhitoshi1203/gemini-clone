import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// styling
import "./../../../assets/scss/pages/Home/_ChatBox.scss";
// database
import { checkExistance, loadChat } from "../../../db";
// components
import ChatHistory from "../../../components/Chat/List";
// hooks
import useUserChat from "../../../hooks/zustand/userChat";
import useGlobal from "../../../hooks/zustand/global";
import send, { gpt } from "../../../config";
import useChat from "../../../hooks/zustand/chat";

function Chatbox() {
	const chatBoxRef = useRef(false);
	const chatBoxRef2 = useRef(false);

	const { state } = useLocation();
	const userID = useGlobal((state) => state.currentUser);
	const navigate = useNavigate(); // incase of invalid conversation id, we will go to /
	const { conversation: chatID } = useParams();
	const chatList = useGlobal((state) => state.user.history);

	//////////////////////////////////////////////////
	const setChat = useUserChat((state) => state.setChat);
	const pushChat = useUserChat((state) => state.pushChat);
	const chats = useUserChat((state) => state.chats);
	const { prepare, stop } = useChat((state) => state.actions);
	/////////////////////////////////////////////////

	const [needQuestion, setNeedQuestion] = useState(() => {
		return state.newQuestion;
	});

	useEffect(() => {
		if (chatBoxRef.current) return;

		// If this hasnt been in the local state, well check the db.
		// app real
		async function retrieve(userID) {
			if (await checkExistance(chatID, chatList, userID)) {
				// set current chat id
				// get content from id
				await loadChat(chatID, userID, (chatData) => {
					if (chatData == "") chatData = [];
					setChat(chatID, chatData);
				});

				//console.log(state);
			} else {
				navigate("/app");
			}
		}

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
		chatBoxRef.current = true;
	}, [needQuestion]);
	/* 
        useEffect(() => {
            if (chatBoxRef2.current) return;

            async function sendReq(configChat) {
                const response = await gpt(configChat, state.question);

            }
            if (state.newQuestion) {
                // set the new question;
                const messageID = window.crypto.randomUUID();
                pushChat(messageID, state.question, "user");
                //prepare(state.question);
                // generate request to the server
                const configChat = {
                    context: "",
                    history: chats
                };
                // send request
                try {
                    console.log("prepare", chats);
                    
                    pushChat(messageID, response, "model");
                    state.newQuestion = false;
                    state.question = "";
                    const messageID = window.crypto.randomUUID();
                    console.log("done", chats);
                } catch (error) {
                    console.log(error);
                }
            }
            chatBoxRef2.current = true;
        }, []);
    */
	// only need question to be true
	useEffect(() => {
		if (chatBoxRef2.current) return;
		async function sendReq(configChat) {
			try {
				//console.log("prepare", chats);
				const messageID = window.crypto.randomUUID();
				const response = await gpt(configChat, state.question);
				pushChat(messageID, response, "model");
				//console.log("done", chats);
			} catch (error) {
				console.error(error);
			}
		}

		if (needQuestion) {
			// set the new question;
			const messageID = window.crypto.randomUUID();
			pushChat(messageID, state.question, "user");
			// generate request to the server
			const configChat = {
				context: "",
				history: chats
			};
			sendReq(configChat);
			setNeedQuestion(false);
			state.question = "";
			// send request
		}
		chatBoxRef2.current = true;
	}, [needQuestion]);
	return (
		<div className="ChatBox">
			<ChatHistory />
		</div>
	);
}
export default Chatbox;
