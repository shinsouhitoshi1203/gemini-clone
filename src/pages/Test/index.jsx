import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import testFunction from "../../db/test";
import Markdown from "react-markdown";
import send from "../../config";
import { parse } from "../../components/Chat/List";

function Test() {
	const [inp, setInp] = useState("");
	const pageRef = useRef(false);
	const handleSend = useCallback(async () => {
		const k = await send(
			{
				context:
					"Short answer, Pick a letter given from a list input by the user",
				history: [
					{
						parts: [{ text: "A, B, C , D" }],
						role: "user"
						//fff: "rvjnvinsdvisdvmkslv" no extra params allowed for gemini
					},
					{
						parts: [{ text: "B" }],
						role: "user"
						//id: "fdffdsfsdfsd fsdfsdf"
					}
				]
			},
			inp
		);
		console.log(k);
	}, [inp]);
	const msg = parse(
		'As of my knowledge cutoff date in early 2023, the J-pop music video with the most views on YouTube is "Lemon" by Kenshi Yonezu.'
	);
	const componentTransforms = {
		React: (props) => <>{props.children}</>
	};

	const renderers = {
		html: (props) => (
			<JsxParser jsx={props.value} components={componentTransforms} />
		)
	};
	return (
		<>
			<h1>Test Gemini</h1>
			<Markdown children={msg} renderers={renderers} />
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
