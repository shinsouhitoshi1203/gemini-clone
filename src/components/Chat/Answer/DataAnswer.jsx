import Options from "./Options";
import RawAnswer from "./RawAnswer";
import useHome from "../../../hooks/useHome";
import { useEffect, useMemo, useRef } from "react";
import useChat from "../../../hooks/zustand/chat";
function DataAnswer({ text, answerID, req }) {
	// console.log(req);
	const allowAnimation = useChat((state) => state.allowAnimation);
	const animationID = useChat((state) => state.animationID);
	return (
		<>
			<div className="ChatBox__answer">
				{animationID == answerID ? (
					allowAnimation ? (
						<>
							<RawAnswer text={text} nope={false} />
						</>
					) : (
						<>
							<RawAnswer nope={true} text={text} />
						</>
					)
				) : (
					<>
						<RawAnswer text={text} nope={true} />
					</>
				)}
			</div>
			<div className="ChatBox__Options">
				{animationID == answerID ? (
					!allowAnimation && <Options />
				) : (
					<Options />
				)}
			</div>
		</>
	);
}
export default DataAnswer;
