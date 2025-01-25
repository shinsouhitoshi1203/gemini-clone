import { Route, Routes } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";
import Home from "./pages/home/home";
import { createContext, useState } from "react";
const SideBarControl = createContext();

function App() {
	const [extend, setExtend] = useState(false); /// 1 hien, 2. full , 3. ko xh

	return (
		<>
			<SideBarControl.Provider value={[extend, setExtend]}>
				<div className="App" data-theme="light">
					<Sidebar></Sidebar>
					<div className="rest">
						<Topbar />
						<Routes>
							<Route path="/" element={<Home />} />
						</Routes>
					</div>
				</div>
			</SideBarControl.Provider>
		</>
	);
}
export default App;
export { SideBarControl };
