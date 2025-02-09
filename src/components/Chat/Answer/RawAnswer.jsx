// raw answer, it is seperated to prevent mass rerendering
import { useEffect, useMemo, useRef, useState } from "react";
import RemarkMathPlugin from "remark-math";
import Markdown from "markdown-to-jsx";
import { status } from "../../../code/controls";

function RawAnswer({ nope, text }) {
	const answerField = useRef();
	const [displayText, setDisplayText] = useState("");
	const wordList = useMemo(() => {
		try {
			return text.split(" ");
		} catch (error) {}
	}, []);

	useEffect(() => {
		const md = answerField.current;
		function copy(e) {
			const t = e.target;
			if (t.matches("pre") || t.matches("code")) {
				const code = t.innerText;
				navigator.clipboard.writeText(code);
			}
		}
		function tooltip(e) {
			const t = e.target;
			if (t.matches("pre") || t.matches("code")) {
				t.setAttribute("title", "Click to copy this code");
			}
		}
		md.addEventListener("click", copy);
		md.addEventListener("mouseover", tooltip);
		return () => {
			md.removeEventListener("click", copy);
			md.removeEventListener("mouseover", tooltip);
		};
	}, []);

	useEffect(() => {
		let isMounted = true;
		console.log(nope, "< Khong can delay");
		if (nope) return;
		async function fn() {
			for (let i = 0; i < wordList.length; ++i) {
				await new Promise((ok) => {
					setTimeout(() => {
						ok();
					}, 25);
				});
				if (status.chat.needStop || !isMounted) return;
				if (i === wordList.length - 1) {
				}
				setDisplayText((x) => x + " " + wordList[i]);
			}
			status.chat.finish();
		}
		fn();
		// status.chat.wait = false;

		//}
		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div className="ChatBox__answer-raw MarkDown" ref={answerField}>
			<Markdown children={!nope ? displayText : text}></Markdown>
		</div>
	);
}
export default RawAnswer;
