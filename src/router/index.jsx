import { createBrowserRouter, Link } from "react-router-dom";
import { loadUI } from "../users";
import App from "../App";
import RootPage from "../pages";
import Main from "../pages/App";
import Home from "../pages/App/Home";
import Test from "../pages/Test";
import Chatbox from "../pages/App/Home/Chatbox";
import Welcome from "../pages/App/Home/Welcome";
import Error from "../pages/App/Error";
import FakeChat from "../pages/Fallback";
import Reset from "../pages/App/Error/Reset";

const router = createBrowserRouter([
	{
		path: "*", // Error page
		element: <Error />
	},
	{
		path: "/",

		element: <App />,
		children: [
			{ path: "", element: <RootPage /> }, // landing page
			{
				path: "landing",
				element: (
					<>
						<h1>LANDING PAGE</h1>
					</>
				)
			},
			{
				path: "app",
				element: <Main />, // main structure
				loader: loadUI,
				HydrateFallback: FakeChat,
				ErrorBoundary: Reset,
				children: [
					{
						path: "",
						element: <Home />,
						children: [
							{ path: "", element: <Welcome /> },
							{ path: ":conversation", element: <Chatbox /> }
						]
					}
					// privacy
					// settings
				]
			},
			{
				path: "privacy",
				element: <Main />, // privacy
				children: [
					{
						path: "",
						element: (
							<div>
								ERROR <Link to="/app">Hello world</Link>{" "}
							</div>
						)
					}
				]
			},
			{
				path: "test",
				element: <Test />
			}
		]
	}
]);

export default router;
