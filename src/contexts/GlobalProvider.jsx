import { createContext, useCallback, useEffect, useRef } from "react";
import useGlobal from "../hooks/zustand/global";
import { useLoaderData } from "react-router-dom";

const GlobalContext = createContext();
const idVersion = import.meta.env.VITE_APP_VERSION;

function GlobalProvider({ children }) {
	const loadUser = useGlobal((x) => x.loadUser);
	const loggedIn = useGlobal((x) => x.loggedIn);
	const { info, settings, history } = useLoaderData();
	const checkVar = useRef(false);

	const fetchUserData = useCallback(async function () {
		if (loggedIn) return;

		if (checkVar.current) return;
		// console.log(history());

		loadUser(info, settings, history());
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
