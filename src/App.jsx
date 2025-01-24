import { Route, Routes } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";
import Home from "./pages/home/home";

function App() {
	return (
		<>
			<div className="App" data-theme="light">
				<Sidebar></Sidebar>
				<div className="rest">
					<Topbar />
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</div>
			</div>
		</>
	);
}
export default App;
