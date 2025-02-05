import { createContext, useCallback, useState } from "react";
import useUserChat from "../hooks/zustand/userChat";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useChat from "../hooks/zustand/chat";
export const SideBarContext = createContext();

function SideBarProvider({ children }) {
	const [extend, setExtend] = useState(false); /// 1 hien, 2. full , 3. ko xh

	const [searchParams, setSearchParams] = useSearchParams();
	const removeChatIDParam = (id) => {
		if (searchParams.has(id)) {
			searchParams.delete(id);
			setSearchParams(searchParams);
		}
	};
	const reset = useUserChat((state) => state.reset);
	const { resetQuestion } = useChat((state) => state.live);
	const navigate = useNavigate();
	const newChatOpen = useCallback(() => {
		removeChatIDParam("conversation");
		navigate("/app", { replace: true });
		resetQuestion();
		reset();
	}, []);
	return (
		<SideBarContext.Provider value={{ extend, setExtend, newChatOpen }}>
			{children}
		</SideBarContext.Provider>
	);
}
export default SideBarProvider;
