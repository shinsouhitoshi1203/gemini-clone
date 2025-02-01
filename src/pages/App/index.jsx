import { memo } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../layout/Sidebar";
import Topbar from "../../layout/Topbar";
import SideBarProvider from "../../contexts/SideBarProvider";
import HomeProvider from "../../contexts/HomeProvider";
import GlobalProvider from "../../contexts/GlobalProvider";

const TopBar = memo(Topbar); // prevent from re-rendering
export async function loadUI() {
	let info, history, settings;
	const ID = await req("", "", "ERROR");
	info = await req("user", ID);
	history = await req("history", ID);
	settings = await req("settings", ID);
	console.log(info, history, settings);
	return { info, history, settings };
}
function Main() {
	return (
		<GlobalProvider>
			<HomeProvider>
				<SideBarProvider>
					<div className="App" data-theme="light">
						<Sidebar></Sidebar>
						<div className="rest">
							<TopBar />
							<Outlet />
						</div>
					</div>
				</SideBarProvider>
			</HomeProvider>
		</GlobalProvider>
	);
}
export default Main;
