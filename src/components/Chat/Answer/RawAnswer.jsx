// raw answer, it is seperated to prevent mass rerendering
import { useEffect, useMemo, useRef, useState } from "react";
import useHome from "../../../hooks/useHome";
import createRequest from "../../../reducers/createRequest";
import { GEMINI_FINISH } from "../../../reducers/chat/actions";

import RemarkMathPlugin from "remark-math";
import Markdown from "markdown-to-jsx";

import { MDXEditor } from "@mdxeditor/editor";
function parse(text) {
	const lines = text.split("\n");

	return lines
		.map((line, index) => {
			// Check if the line is part of a list
			const isListItem = /^\s*[*\-+]\s+|^\s*\d+\.\s+/.test(line);
			const isNextLineListItem =
				index < lines.length - 1 &&
				/^\s*[*\-+]\s+|^\s*\d+\.\s+/.test(lines[index + 1]);

			if (isListItem || isNextLineListItem) return line;

			if (line.trim() === "\\") return line.replace("\\", "\n");

			return line + "\n";
		})
		.join("\n");
}
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
		let isMounted = true;
		if (needDelay) {
			async function fn() {
				for (let i = 0; i < wordList.length; ++i) {
					await new Promise((ok, nope) => {
						setTimeout(() => {
							ok();
						}, 60);
					});
					// console.log(reset.current);
					if (!isMounted) return;
					if (i == wordList.length - 1)
						set(createRequest(GEMINI_FINISH));
					setDisplayText((x) => x + " " + wordList[i]);
				}
			}
			fn();
		}
		return () => {
			isMounted = false;
		};
	}, []);
	// console.log(parse(text));

	return (
		<div className="ChatBox__answer-raw MarkDown" ref={answerField}>
			<Markdown children={text}></Markdown>
		</div>
	);
}
export default RawAnswer;
// needDelay ? displayText : text
