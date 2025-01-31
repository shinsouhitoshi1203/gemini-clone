import { useCallback } from "react";
import { useState } from "react";

function Test() {
	const [inp, setInp] = useState("");
	const send = useCallback(() => {}, [inp]);
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
				<button onClick={send} style={{ background: "pink" }}>
					Send request
				</button>
			</div>
		</>
	);
}
export default Test;
