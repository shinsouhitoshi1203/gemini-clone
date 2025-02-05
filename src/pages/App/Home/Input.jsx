import { memo, useCallback, useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Button from "../../../components/Button";
import TextBox from "../../../components/TextBox";

import useChat from "../../../hooks/zustand/chat";

import { useNavigate, useParams } from "react-router-dom";
import useGlobal from "../../../hooks/zustand/global";
import { newChat } from "../../../db";
import useUserChat from "../../../hooks/zustand/userChat";
function Input() {
	const navigate = useNavigate();
	// get actions
	const { prepare, stop } = useChat((state) => state.actions);
	// get states
	const allowForceStop = useChat((state) => state.allowForceStop);
	// check var URL
	const { conversation: chatID } = useParams();
	const pushHistory = useGlobal((state) => state.pushHistory);
	const userID = useGlobal((state) => state.currentUser);
	// local state
	const [input, setInput] = useState("");
	const chats = useUserChat((state) => state.chats);
	// send request from this input
	const sendReq = useCallback(
		async (e) => {
			if (e.key == "Enter" && input) {
				try {
					// logic check co req
					// ----------------------- //
					if (!chatID) {
						const ID = window.crypto.randomUUID();
						newChat(ID, userID, () => {
							navigate("/app/" + ID, {
								state: { newQuestion: true, question: input }
							});
							pushHistory(ID);

							setInput("");
						});
					} else {
						//console.log(chats);
						// already have the data, just push it to history
					}
					// -----------------------
				} catch (error) {
					console.error(error);
				}
			}
		},
		[input]
	);
	// return
	return (
		<>
			<TextBox
				input={input}
				setInput={setInput}
				cls="pageHome__input-real GEMINI__input"
				left={[
					<Button
						type="main"
						caption="Attach an image"
						icon={<ImageOutlinedIcon />}
						size="40 40 50%"
					/>
				]}
				placeholder="Enter a prompt here"
				right={[
					!allowForceStop ? (
						<Button
							type="main"
							caption="Input from voice"
							icon={<MicIcon />}
							size="40 40 50%"
						/>
					) : (
						<Button
							type="main"
							caption="Cancel"
							icon={<StopCircleIcon />}
							size="40 40 50%"
							onClick={() => {
								stop();
							}}
						/>
					)
				]}
				onKeyDown={sendReq}
			/>
		</>
	);
}
export default memo(Input);
