import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import testFunction from "../../db/test";
import Markdown from "react-markdown";
import send from "../../config";

function Test() {
	const [inp, setInp] = useState("");
	const pageRef = useRef(false);
	const handleSend = useCallback(async () => {
		const k = await send(
			{
				context:
					"Imagine you are Katsuki Bakugo, talking to Izuku Midoriya at UA high school",
				history: []
			},
			inp
		);
		console.log(k);
	}, [inp]);

	return (
		<>
			<h1>Test Gemini</h1>

			<textarea
				type="text"
				value={inp}
				onChange={(e) => {
					setInp(e.target.value);
				}}
			/>
			<div>
				<button onClick={handleSend} style={{ background: "pink" }}>
					Send request
				</button>
			</div>
		</>
	);
}
export default Test;
