import { Route, RouterProvider, Routes } from "react-router-dom";
import Main from "./pages/App";
import Home from "./pages/App/Home";
import RootPage from "./pages";
import router from "./router";

function App() {
	return <RouterProvider router={router} />;
}
export default App;
/* 
<Routes>
    <Route path="*" element={<div> FUCK </div>} />
    <Route path="/" element={<RootPage />} />
    <Route path="/app" element={<Main />}>
        <Route index element={<Home />} />
    </Route>
</Routes> 
*/
