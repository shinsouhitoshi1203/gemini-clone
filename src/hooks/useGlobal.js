import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalProvider";

function useGlobal() {
    return useContext(GlobalContext);
}
export default useGlobal;