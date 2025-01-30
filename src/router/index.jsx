import { createBrowserRouter, Link } from "react-router-dom";
import RootPage from "../pages";
import Main from "../pages/App";
import Home from "../pages/App/Home";

const router = createBrowserRouter([
	{ path: "*", element: <div>FUCK</div> },
	{
		path: "/",
		children: [
			{ path: "", element: <RootPage /> },
			{
				path: "app",
				element: <Main />,
				children: [
					{ path: "", element: <Home /> }
					// privacy
					// settings
				]
			},
			{
				path: "privacy",
				element: <Main />,
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
			}
		]
	}
]);

export default router;
