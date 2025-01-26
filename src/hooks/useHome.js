import { useContext } from "react";
import { HomeContext } from "../contexts/HomeProvider";

function useHome() {
    return useContext(HomeContext);
}

export default useHome;