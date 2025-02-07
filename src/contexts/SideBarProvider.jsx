import { createContext, useCallback, useState } from "react";
import useUserChat from "../hooks/zustand/userChat";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useChat from "../hooks/zustand/chat";
import actions from "../code/controls";
export const SideBarContext = createContext();

function SideBarProvider({ children }) {
	const [extend, setExtend] = useState(false); /// 1 hien, 2. full , 3. ko xh

	return (
		<SideBarContext.Provider value={{ extend, setExtend }}>
			{children}
		</SideBarContext.Provider>
	);
}
export default SideBarProvider;
