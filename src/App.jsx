import { Route, Routes } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";
import Home from "./pages/Home/Home";
import HomeProvider from "./contexts/HomeProvider";
import SideBarProvider from "./contexts/SideBarProvider";
import { memo } from "react";

const TopBar = memo(Topbar);
function App() {
	return (
		<SideBarProvider>
			<div className="App" data-theme="light">
				<Sidebar></Sidebar>
				<div className="rest">
					{<TopBar />}
					<Routes>
						<Route
							path="/"
							element={
								<HomeProvider>
									<Home />
								</HomeProvider>
							}
						/>
					</Routes>
				</div>
			</div>
		</SideBarProvider>
	);
}
export default App;
