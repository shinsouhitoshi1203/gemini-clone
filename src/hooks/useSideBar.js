import { useContext } from "react";
import { SideBarContext } from "../contexts/SideBarProvider";


function useSideBar() {
    return useContext(SideBarContext);
}
export default useSideBar;