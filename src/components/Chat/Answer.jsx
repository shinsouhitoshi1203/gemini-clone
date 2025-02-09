import { memo } from "react";
import useChat from "../../hooks/zustand/chat";
import useGlobal from "../../hooks/zustand/global";
import DataAnswer from "./Answer/DataAnswer";
import WaitForAnswer from "./Answer/WaitForAnswer";
function Answer({ chatData, answerID, cancelled }) {
	const { avatar } = useGlobal((x) => x.app);

	return (
		<>
			<div className="ChatBox__Chat-Answer ChatBox__Chat">
				<div className="ChatBox__user">
					<img src={avatar} alt="" />
				</div>
				<div className="ChatBox__message">
					<DataAnswer
						text={chatData}
						answerID={answerID}
						cancelled={cancelled}
					/>
				</div>
			</div>
		</>
	);
}
export default memo(Answer);
/* 
<div className="ChatBox__cancelled">
    The response display is suspended as the user
    pressed to stop receiving the message
</div> */
