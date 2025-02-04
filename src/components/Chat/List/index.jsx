import { memo, useEffect, useRef, useState } from "react";
import useUserChat from "../../../hooks/zustand/userChat";
import Ask from "../Ask";
import Answer from "../Answer";
const sample = {
	question: "Lorem",
	answer: "Lorem"
};
const parse = (test) => {
	const k = test.split("\\n");
	let res = "";
	k.forEach((e) => {
		if (e.slice(-1) == "\\") {
			res += e + "\\n";
		} else if (e.trim() == "") {
			res += "\n &nbsp;<br /><br /> \n";
		} else {
			res += "\n" + e;
		}
	});
	return res;
};
function ChatHistory() {
	const [history, setHistory] = useState([]);
	const historyRef = useRef(false);
	const chats = useUserChat((state) => state.chats);

	return (
		<>
			{chats &&
				// will use the id as a key later
				chats.map((chat, i) => {
					const msg = chat.parts[0].text.toString();
					console.log(msg);

					return chat.role == "user" ? (
						<Ask chatData={parse(msg)} key={i} />
					) : (
						<Answer chatData={parse(msg)} key={i} />
					);
				})}
		</>
	);
}
export default memo(ChatHistory);
