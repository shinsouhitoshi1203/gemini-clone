import { useEffect, useRef, useState } from "react";
import { status } from "../../../../code/controls";
import Option from "./Option";
import useChat from "../../../../hooks/zustand/chat";

function Options({ cancelled, answerID }) {
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
            -1: stopped without visible
            0: visible
            1: disappear without stopping.
        */
		if (messageRef.current) return;
		const sub2 = useChat.subscribe(
			(state) => state.allowAnimation,
			(allowAnimation) => {
				if (status.chat.answerID == answerID) {
					if (!allowAnimation) {
						setFormat(0);
						sub2();
					}
				}
			}
		);
		const sub1 = useChat.subscribe(
			(state) => state.mustStop,
			(mustStop) => {
				if (status.chat.answerID == answerID) {
					if (mustStop) {
						setFormat(-1);
						console.log("stopped without visible");
						sub2();
						sub1();
					}
				}
			}
		);

		messageRef.current = true;
	}, []);
	return (
		<>
			{format == 1 ? (
				<></>
			) : format == -1 ? (
				<></>
			) : (
				<div className="ChatBox__Options">
					<Option />
				</div>
			)}
		</>
	);
}
export default Options;
