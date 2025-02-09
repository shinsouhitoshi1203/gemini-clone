import { useEffect, useRef, useState } from "react";
import { status } from "../../../../code/controls";
import RawAnswer from "../RawAnswer";
import useChat from "../../../../hooks/zustand/chat";

function Message({ answerID, cancelled, text }) {
	const messageRef = useRef(false);
	const [format, setFormat] = useState(() => {
		if (cancelled) {
			return -1;
		} else {
			if (status.chat.answerID == answerID) {
				if (status.chat.animate) {
					return 1;
				} else {
					return 0;
				}
			} else {
				return 0;
			}
		}
	});
	useEffect(() => {
		/* 
            -1: stopped
            0: default
            1: animation
        */
		if (messageRef.current) return;
		useChat.subscribe(
			(state) => state.mustStop,
			(mustStop) => {
				if (status.chat.answerID == answerID) {
					if (mustStop) {
						setFormat(-1);
					}
				}
			}
		);
		messageRef.current = true;
	}, []);
	return (
		<div className="ChatBox__answer">
			{format == 1 ? (
				<RawAnswer text={text} nope={false} />
			) : format == -1 ? (
				<div className="ChatBox__cancelled">
					The response display is suspended as the user pressed to
					stop receiving the message
				</div>
			) : (
				<RawAnswer text={text} nope={true} />
			)}
		</div>
	);
}
export default Message;
