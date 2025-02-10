import { memo } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../layout/Sidebar";
import Topbar from "../../layout/Topbar";
import HomeProvider from "../../contexts/HomeProvider";
import GlobalProvider from "../../contexts/GlobalProvider";

const TopBar = memo(Topbar); // prevent from re-rendering
const SideBar = memo(Sidebar); // prevent from re-rendering

function Main() {
	return (
		<GlobalProvider>
			<HomeProvider>
				<div className="App" data-theme="dark">
					<SideBar></SideBar>
					<div className="rest">
						<TopBar />
						<Outlet />
					</div>
				</div>
			</HomeProvider>
		</GlobalProvider>
	);
}
export default Main;
