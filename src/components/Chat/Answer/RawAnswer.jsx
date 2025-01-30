// raw answer, it is seperated to prevent mass rerendering
import { useEffect, useMemo, useRef, useState } from "react";
import useHome from "../../../hooks/useHome";
import createRequest from "../../../reducers/createRequest";
import { GEMINI_FINISH } from "../../../reducers/chat/actions";

import RemarkMathPlugin from "remark-math";
import Markdown from "markdown-to-jsx";
// import { MDXEditor } from "@mdxeditor/editor";
// import { headingsPlugin } from "@mdxeditor/editor";

// import "@mdxeditor/editor/style.css";
function RawAnswer({ needDelay, text }) {
	const { set } = useHome();
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
		if (needDelay) {
			async function fn() {
				for (let i = 0; i < wordList.length; ++i) {
					await new Promise((ok, nope) => {
						setTimeout(() => {
							ok();
						}, 60);
					});
					// console.log(reset.current);

					if (i == wordList.length - 1)
						set(createRequest(GEMINI_FINISH));
					setDisplayText((x) => x + " " + wordList[i]);
				}
			}
			fn();
		}
	}, []);

	return (
		<div className="ChatBox__answer-raw MarkDown" ref={answerField}>
			<Markdown
				children={needDelay ? displayText : text}
				plugins={[RemarkMathPlugin]}
			/>
		</div>
	);
}
export default RawAnswer;
