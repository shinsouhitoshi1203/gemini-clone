import { memo, useEffect, useRef, useState } from "react";
import useUserChat, { renderUI } from "../../../hooks/zustand/userChat";
import Ask from "../Ask";
import Answer from "../Answer";
import useChat from "../../../hooks/zustand/chat";

export const parse = (test) => {
	const k = test.split("\\n");

	let res = "";
	k.forEach((e, i) => {
		if (e.slice(-1) == "\\") {
			// const "\\ \n is a line break"
			let n = e.length - 1;
			let c = 1;
			let str = "\\";
			while (e[n - 1] == "\\") {
				c++;
				n--;
				str += "\\";
			}
			if (c % 2 == 0) {
				res += e + "\\n"; // \n co the xuong dong ==> xuong dong
				const n = Math.trunc(str.length / 2);
				res += e.slice(0, n) + e.slice(n) + "\\n";
			} else {
				const n = Math.trunc(str.length / 2);
				res += e.slice(0, n) + e.slice(n) + "n"; // \n khong the xuong dong ==> giu lai
			}
			res += e + "\\n";
		} else if (e.trim() == "") {
			if (i == 0) {
				res += "\n &nbsp; \n";
			} else {
				res += "\n &nbsp;<br />\n";
			}
		} else {
			res += e + (i != 0 ? "<br />" : "");
		}
	});
	return res;
};
function ChatHistory() {
	const historyRef = useRef(false);
	const [chat, setChat] = useState([]);

	useEffect(() => {
		if (historyRef.current) return;

		useUserChat.subscribe(
			(state) => state.chats,
			(chats) => {
				setChat(() => {
					return renderUI(chats);
				});
			}
		);

		historyRef.current = true;
	}, []);

	return (
		<>
			{chat &&
				// will use the id as a key later
				chat.map((chat) => {
					const msg = chat.parts[0].text;

					const messageID = chat.id;
					const cancelled = chat.cancelled;
					return chat.role == "user" ? (
						<Ask chatData={parse(msg)} key={messageID} />
					) : (
						<Answer
							cancelled={cancelled}
							answerID={messageID}
							chatData={parse(msg)}
							key={messageID}
						/>
					);
				})}
		</>
	);
}
export default memo(ChatHistory);
