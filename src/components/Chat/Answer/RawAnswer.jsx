// raw answer, it is seperated to prevent mass rerendering
import { useEffect, useMemo, useState } from "react";
import Markdown from "markdown-to-jsx";

function RawAnswer({ needDelay, text }) {
	const [displayText, setDisplayText] = useState("");
	const wordList = useMemo(() => {
		try {
			return text.split(" ");
		} catch (error) {}
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
					setDisplayText((x) => x + " " + wordList[i]);
				}
			}
			fn();
		}
	}, []);
	return (
		<>
			<Markdown
				style={{ font: "initial" }}
				children={needDelay ? displayText : text}
			/>
		</>
	);
}
export default RawAnswer;
