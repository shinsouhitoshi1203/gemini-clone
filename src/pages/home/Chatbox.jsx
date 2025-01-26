import { useEffect, useMemo, useState } from "react";
import useHome from "../../hooks/useHome";
import requestGPT from "../../code/req";
import processGPT from "../../config/gemini";
import Markdown from "react-markdown";

function Chatbox() {
	const { recent, response } = useHome();

	return (
		<>
			<div className="list">
				<Markdown>{response}</Markdown>
			</div>
		</>
	);
}
export default Chatbox;
