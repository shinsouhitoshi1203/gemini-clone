import { memo, useCallback } from "react";
import MicIcon from "@mui/icons-material/Mic";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Button from "../../../components/Button";
import TextBox from "../../../components/TextBox";
import useHome from "../../../hooks/useHome";
import {
	GEMINI_PREPARE,
	GEMINI_READY,
	GEMINI_STOP_RESPONSING
} from "../../../reducers/chat/actions";
import createRequest from "../../../reducers/createRequest";
function Input() {
	const { input, data, send } = useHome();
	const sendReq = useCallback(
		async (e) => {
			if (e.key == "Enter" && input) {
				try {
					await send(input);
				} catch (error) {}
			}
		},
		[input]
	);
	return (
		<>
			<TextBox
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
					!data.allowForceStop ? (
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
								set(createRequest(GEMINI_STOP_RESPONSING));
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
