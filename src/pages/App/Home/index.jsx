import Input from "./Input";
import Hyperlink from "../../../components/Hyperlink";

// styling
import "./../../../assets/scss/pages/Home/Home.scss";
// hooks
import { Outlet, useLocation } from "react-router-dom";
import { createContext, memo, useEffect, useLayoutEffect, useRef } from "react";
import useInteract from "../../../hooks/zustand/interact";
import useUserChat from "../../../hooks/zustand/userChat";
const ScrollProvider = createContext();
function Home() {
	const displayRef = useRef();
	const { pathname } = useLocation();
	useEffect(() => {
		const scrollHandler = () => {
			const asking =
				displayRef?.current?.querySelector(
					"div.ChatBox__Chat-Ask:last-child"
				) ?? document.querySelector("div.ChatBox__Chat-Ask:last-child");
			asking?.scrollIntoView({ block: "start", inline: "nearest" });
		};
		useInteract.subscribe(
			(state) => state.scroll,
			({ need, padding }) => {
				if (need && padding) {
					scrollHandler();
				}
			}
		);

		return () => {};
	}, []);

	return (
		<div className="pageHome router">
			<div className="pageHome__display" ref={displayRef}>
				<ScrollProvider.Provider value={displayRef}>
					<div className="page__wrapper">
						<Outlet />
					</div>
				</ScrollProvider.Provider>
			</div>

			<div className="pageHome__input">
				<div className="page__wrapper">
					<Input />
					<p className="pageHome__disclaimer font-4">
						Gemini may display inaccurate info, including about
						people, so double-check its responses.
						<Hyperlink
							href="/privacy"
							text="Your privacy & Gemini Apps"
							cls="pageHome__privacy"
						/>
					</p>
				</div>
			</div>
		</div>
	);
}
export default memo(Home);
export { ScrollProvider };
