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
				res += "\n &nbsp;<br /> \n";
			} else {
				res += "\n &nbsp;<br /><br /> \n";
			}
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
