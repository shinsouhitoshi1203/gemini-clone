import { createContext, useMemo, useState } from "react";
import processGPT from "../config/gemini";
const HomeContext = createContext();
function HomeProvider({ children }) {
	const [input, setInput] = useState("");
	const [recent, setRecent] = useState("");
	const [allowChat, setAllowChat] = useState(false);
	const [response, setResponse] = useState("");
	const [loading, setLoading] = useState(false);
	const handleSend = useMemo(() => {
		return async function () {
			setRecent(input);
			setAllowChat(true);
			setLoading(true);
			setInput("");
			setResponse("");
			const req = await processGPT(input);
			setLoading(false);
			setResponse(req);
		};
	}, [input]);

	const store = {
		input,
		setInput,
		recent,
		setRecent,
		allowChat,
		setAllowChat,
		handleSend,
		response,
		setResponse,
		loading,
		setLoading
	};

	return (
		<HomeContext.Provider value={store}>{children}</HomeContext.Provider>
	);
}
export default HomeProvider;
export { HomeContext };
