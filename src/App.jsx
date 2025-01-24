import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";

function App() {
	return (
		<>
			<div className="App" data-theme="light">
				<Sidebar></Sidebar>
				<div className="rest">
					<Topbar />
					{/* Logic ... updates */}
					{/* <Main /> */}
				</div>
			</div>
		</>
	);
}
export default App;
