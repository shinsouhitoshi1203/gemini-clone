import { useEffect, useMemo, useState } from "react";
import useHome from "../../hooks/useHome";
import requestGPT from "../../code/req";
import processGPT from "../../config/gemini";
import Markdown from "react-markdown";
import "./../../assets/scss/pages/Home/_ChatBox.scss";
import Chat from "../../components/Chat/Chat";
function Chatbox() {
	const { recent } = useHome();

	return (
		<>
			<div className="ChatBox">
				<Chat />
			</div>
		</>
	);
}
export default Chatbox;
