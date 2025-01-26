import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// styles
import "./assets/scss/main.scss";
import { BrowserRouter } from "react-router-dom";
import GlobalProvider from "./contexts/GlobalProvider";
const $ = document.querySelector.bind(document);

const root = ReactDOM.createRoot($("#root"));

root.render(
	<StrictMode>
		<GlobalProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</GlobalProvider>
	</StrictMode>
);
