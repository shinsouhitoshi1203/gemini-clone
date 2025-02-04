import {
	createContext,
	useCallback,
	useEffect,
	useReducer,
	useRef
} from "react";
import reducer from "../reducers/global/reducer";
import initData from "../reducers/global/init";
import useGlobal from "../hooks/zustand/global";
import req from "../hooks/zustand/req";
import { useLoaderData } from "react-router-dom";
import FakeChat from "../pages/Fallback";

const GlobalContext = createContext();
const idVersion = import.meta.env.VITE_APP_VERSION;

export async function loadUI() {
	let info, history, settings;

	const ID = await req("", "");
	if (ID == "ERROR") throw new Error("Error occured");
	info = await req("user", ID);
	if (info == "ERROR") throw new Error("Error occured");

	history = await req("history", ID);
	if (history == "ERROR") throw new Error("Error occured");

	settings = await req("settings", ID);
	if (settings == "ERROR") throw new Error("Error occured");

	//console.log(info, history, settings);
	return { info, history, settings };
}

function GlobalProvider({ children }) {
	const loadUser = useGlobal((x) => x.loadUser);
	const loggedIn = useGlobal((x) => x.loggedIn);
	const { info, settings, history } = useLoaderData();
	const checkVar = useRef(false);

	const fetchUserData = useCallback(async function () {
		if (loggedIn) return;

		if (checkVar.current) return;

		loadUser(info, settings, history.list);
		checkVar.current = true;
		return "";
	}, []);

	useEffect(() => {
		if (checkVar.current) return;
		async function run() {
			await fetchUserData();
		}
		run();
		checkVar.current = true;
	}, []);

	return <>{children}</>;
}
export default GlobalProvider;
export { GlobalContext };
