import { memo } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../layout/Sidebar";
import Topbar from "../../layout/Topbar";
import SideBarProvider from "../../contexts/SideBarProvider";
import HomeProvider from "../../contexts/HomeProvider";

const TopBar = memo(Topbar); // prevent from re-rendering
function Main() {
	return (
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
	);
}
export default Main;
