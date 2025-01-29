import {
	createContext,
	useCallback,
	useMemo,
	useReducer,
	useState
} from "react";
const HomeContext = createContext();
export { HomeContext };
import processGPT from "../config/gemini";
import reducer from "../reducers/chat/reducer";
import initData from "../reducers/chat/init";
function HomeProvider({ children }) {
	const [data, set] = useReducer(reducer, initData);
	const [input, setInput] = useState("");
	const send = useCallback(async (payload = "") => {
		const response = await processGPT(payload);
		return response;
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
