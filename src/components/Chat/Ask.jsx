import { useMemo } from "react";
import useHome from "../../hooks/useHome";
import Button from "../Button";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import useGlobal from "../../hooks/useGlobal";
function Ask({ chatData }) {
	const { data } = useHome();
	const { global } = useGlobal();
	return (
		<>
			<div className="ChatBox__Chat-Ask">
				<div className="ChatBox__user">
					<img src={global.user.avatar} alt="" />
				</div>
				<div className="ChatBox__message">
					<h2 className="ChatBox__question font-6">
						{chatData ? chatData.question : data.recent}
					</h2>
					<div className="ChatBox__tts">
						<Button
							icon={<VolumeUpIcon />}
							caption="Read the question"
							size="24 24 50%"
							type="main"
							cls="ChatBox__tts-btn"
						/>
					</div>
				</div>
			</div>
		</>
	);
}
export default Ask;
