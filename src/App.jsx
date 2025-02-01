import { Outlet } from "react-router-dom";
import router from "./router";
import GlobalProvider from "./contexts/GlobalProvider";

function App() {
	return <Outlet />;
}
export default App;
