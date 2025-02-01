import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
// styles
import "./assets/scss/main.scss";
import GlobalProvider from "./contexts/GlobalProvider";
import { RouterProvider } from "react-router-dom";
import router from "./router";

const $ = document.querySelector.bind(document);
const root = ReactDOM.createRoot($("#root"));

root.render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
