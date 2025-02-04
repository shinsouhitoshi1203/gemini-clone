import { useEffect, useRef } from "react";
import Chat from "../../../components/Chat";
// styling
import useGlobal from "../../../hooks/zustand/global";
import "./../../../assets/scss/pages/Home/_ChatBox.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { checkExistance, loadChat } from "../../../db";
import useUserChat from "../../../hooks/zustand/userChat";
import ChatHistory from "../../../components/Chat/List";
import Ask from "../../../components/Chat/Ask";
import Answer from "../../../components/Chat/Answer";

function Chatbox() {
	const { state } = useLocation();
	const userID = useGlobal((state) => state.currentUser);
	const chatBoxRef = useRef(false);
	const navigate = useNavigate(); // incase of invalid conversation id, we will go to /
	const { conversation: chatID } = useParams();
	const chatList = useGlobal((state) => state.user.history);

	///////////////////////////////////////////////////////
	const setChat = useUserChat((state) => state.setChat);
	const { chats } = useUserChat();
	useEffect(() => {
		if (chatBoxRef.current) return;

		// If this hasnt been in the local state, well check the db.
		// app real
		async function retrieve(userID) {
			if (await checkExistance(chatID, chatList, userID)) {
				// set current chat id
				// get content from id
				await loadChat(chatID, userID, (chatData) => {
					setChat(chatID, chatData);
				});

				//console.log(state);
			} else {
				navigate("/app");
			}
		}

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
		chatBoxRef.current = true;
	}, []);

	return (
		<div className="ChatBox">
			<ChatHistory />
		</div>
	);
}
export default Chatbox;
