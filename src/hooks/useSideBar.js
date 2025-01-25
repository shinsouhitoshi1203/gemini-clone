import { useContext } from "react";
import { SideBarControl } from "../App";

function useSideBar() {
    return useContext(SideBarControl);
}
export default useSideBar;