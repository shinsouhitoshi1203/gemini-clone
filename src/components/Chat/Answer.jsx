import { memo } from "react";
import useChat from "../../hooks/zustand/chat";
import useGlobal from "../../hooks/zustand/global";
import DataAnswer from "./Answer/DataAnswer";
import WaitForAnswer from "./Answer/WaitForAnswer";
function Answer({ chatData, answerID }) {
	const { avatar } = useGlobal((x) => x.app);
	const mustStop = useChat((state) => state.mustStop);
	// useEffect(() => {
	// 	if (historyRef.current) return;

	// 	useChat.subscribe(
	// 		(state) => state.animationID,
	// 		(id) => {}
	// 	);

	// 	historyRef.current = true;
	// }, []);
	// console.log(animationID, answerID);

	return (
		<>
			<div className="ChatBox__Chat-Answer ChatBox__Chat">
				<div className="ChatBox__user">
					<img src={avatar} alt="" />
				</div>
				<div className="ChatBox__message">
					{!mustStop ? (
						<DataAnswer text={chatData} answerID={answerID} />
					) : (
						<div className="ChatBox__cancelled">
							The response display is suspended as the user
							pressed to stop receiving the message
						</div>
					)}
				</div>
			</div>
		</>
	);
}
export default memo(Answer);
