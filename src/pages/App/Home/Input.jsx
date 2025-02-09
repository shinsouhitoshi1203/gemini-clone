import { memo, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MicIcon from "@mui/icons-material/Mic";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Button from "../../../components/Button";
import TextBox from "../../../components/TextBox";

import actions, { status } from "../../../code/controls";
import useChat from "../../../hooks/zustand/chat";

function Input() {
	// navigator
	const navigate = useNavigate();
	// check var URL
	const { conversation: chatID } = useParams();
	// input
	const [input, setInput] = useState("");
	// wait
	const process = useChat((state) => state.process);
	const allowForceStop = useChat((state) => state.allowForceStop);
	const allowLoading = useChat((state) => state.allowLoading);
	// send request from this input
	const sendReq = useCallback(
		async (e) => {
			if (e.key == "Enter" && input) {
				try {
					status.chat.prepare();
					status.chat.wait = true;
					actions.push.request(input, navigate, chatID);
				} catch (error) {
					console.error(error);
				} finally {
					setInput("");
					status.chat.wait = false;
				}
			}
		},
		[input]
	);
	const handleStopRequest = useCallback(() => {
		actions.stop();
	}, []);
	// return
	return (
		<>
			<TextBox
				disabled={process}
				input={input}
				setInput={setInput}
				cls="pageHome__input-real GEMINI__input"
				left={[
					<Button
						type="main"
						caption="Attach an image"
						icon={<ImageOutlinedIcon />}
						size="40 40 50%"
						onClick={() => {
							status.chat.finish();
						}}
					/>
				]}
				placeholder="Enter a prompt here"
				right={[
					!allowForceStop && !allowLoading ? (
						// true
						<Button
							type="main"
							caption="Input from voice"
							icon={<MicIcon />}
							size="40 40 50%"
						/>
					) : (
						// false
						<Button
							type="main"
							caption="Cancel"
							icon={<StopCircleIcon />}
							size="40 40 50%"
							onClick={handleStopRequest}
						/>
					)
				]}
				onKeyDown={sendReq}
			/>
		</>
	);
}
export default memo(Input);
