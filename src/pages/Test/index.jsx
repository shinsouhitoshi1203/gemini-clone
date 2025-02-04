import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import testFunction from "../../db/test";
import Markdown from "react-markdown";

function Test() {
	const [inp, setInp] = useState("");
	const pageRef = useRef(false);
	const send = useCallback(() => {}, [inp]);
	useEffect(() => {
		if (pageRef.current) return;
		async function run() {
			testFunction();
		}
		run();
		pageRef.current = true;
	}, []);
	const str = `Tch. "Best"? Like *you* even need to try that hard, you half-and-half bastard. Don't act like that ice and fire quirk of yours isn't some automatic "get out of jail free" card. Yeah, we all saw your fancy showing during the sports festival. Fucking unfair advantage, that's what it is. Like you didn't even have to sweat a single drop! \n \n So yeah, *we* need to do our best, fine, whatever. You just... stand there and look all cool. Makes me sick. Just try not to make it look *too* easy while you're at it, would you? Fucking... lucky bastard. \n`;
	return (
		<>
			<h1>Test Gemini</h1>

			<Markdown>{str}</Markdown>
			<textarea
				type="text"
				value={inp}
				onChange={(e) => {
					setInp(e.target.value);
				}}
			/>
			<div>
				<button onClick={send} style={{ background: "pink" }}>
					Send request
				</button>
			</div>
		</>
	);
}
export default Test;
