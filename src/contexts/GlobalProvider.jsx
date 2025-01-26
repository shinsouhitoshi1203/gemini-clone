import { createContext, useRef, useState } from "react";

const GlobalContext = createContext();
const idVersion = import.meta.env.VITE_APP_VERSION;
function GlobalProvider({ children }) {
	// for further development <
	//      DONT CARE THESE HOOKS
	// >
	const version = useRef(idVersion);
	const [user, setUser] = useState({});
	const [localSettings, setLocalSettings] = useState({});
	// currently used
	const [history, setHistory] = useState([]);
	const store = {
		version,
		user,
		setUser,
		localSettings,
		setLocalSettings,
		history,
		setHistory
	};
	return (
		<GlobalContext.Provider value={store}>
			{children}
		</GlobalContext.Provider>
	);
}
export default GlobalProvider;
export { GlobalContext };
