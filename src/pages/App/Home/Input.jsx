import { memo, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MicIcon from "@mui/icons-material/Mic";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Button from "../../../components/Button";
import TextBox from "../../../components/TextBox";

import actions from "../../../code/controls";

function Input() {
	// navigator
	const navigate = useNavigate();
	// check var URL
	const { conversation: chatID } = useParams();
	const [input, setInput] = useState("");
	// send request from this input
	const sendReq = useCallback(
		async (e) => {
			if (e.key == "Enter" && input) {
				try {
					actions.push.request(input, navigate, chatID);
				} catch (error) {
					console.error(error);
				} finally {
					setInput("");
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
					true ? (
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
								actions.stop();
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
