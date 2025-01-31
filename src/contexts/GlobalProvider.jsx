import { createContext, useReducer, useRef, useState } from "react";
import reducer from "../reducers/global/reducer";
import initData from "../reducers/global/init";

const GlobalContext = createContext();
const idVersion = import.meta.env.VITE_APP_VERSION;
function GlobalProvider({ children }) {
	// for further development <
	//      DONT CARE THESE HOOKS
	// >
	const app = useRef({
		avatar: "./gemini.png",
		version: idVersion,
		name: "gemini-clone"
	});

	// currently used

	const [global, tackle] = useReducer(reducer, initData);
	const store = { app, global, tackle };
	return (
		<GlobalContext.Provider value={store}>
			{children}
		</GlobalContext.Provider>
	);
}
export default GlobalProvider;
export { GlobalContext };
