import { createContext, useCallback, useReducer, useState } from "react";
const HomeContext = createContext();
export { HomeContext };
import processGPT from "../config/gemini";
import reducer from "../reducers/chat/reducer";
import initData from "../reducers/chat/init";
import createRequest from "../reducers/createRequest";
import { GEMINI_PREPARE, GEMINI_READY } from "../reducers/chat/actions";
function HomeProvider({ children }) {
	const [data, set] = useReducer(reducer, initData);
	const [input, setInput] = useState("");
	const handleRequest = useCallback(async (payload = "") => {
		const response = await processGPT(payload);
		return response;
	}, []);
	const send = useCallback(async (input = "") => {
		const tempInput = input;
		set(createRequest(GEMINI_PREPARE, input));
		setInput("");
		const response = await handleRequest(tempInput);
		set(createRequest(GEMINI_READY, response));
	}, []);
	const store = {
		input,
		setInput,
		data,
		set,
		send
	};

	return (
		<HomeContext.Provider value={store}>{children}</HomeContext.Provider>
	);
}

// context and provider must be exported in the end of file
export default HomeProvider;
