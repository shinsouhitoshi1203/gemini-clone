import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
// styles
import "./assets/scss/main.scss";

const $ = document.querySelector.bind(document);
const root = ReactDOM.createRoot($("#root"));

root.render(
	// <StrictMode>
	<RouterProvider router={router} />
	/* </StrictMode> */
);
