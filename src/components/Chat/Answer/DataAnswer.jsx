// import Options from "./Options";
import { useRef } from "react";
import Message from "./Message";
import Options from "./Options";

function DataAnswer({ text, answerID, cancelled }) {
	const answerIDRef = useRef(answerID);
	return (
		<>
			<Message
				answerID={answerIDRef.current}
				cancelled={cancelled}
				text={text}
			/>
			<Options cancelled={cancelled} answerID={answerIDRef.current} />
		</>
	);
}
export default DataAnswer;
