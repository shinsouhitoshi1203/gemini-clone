import { createContext, useState } from "react";
export const SideBarContext = createContext();

function SideBarProvider({ children }) {
	const [extend, setExtend] = useState(false); /// 1 hien, 2. full , 3. ko xh

	return (
		<SideBarContext.Provider value={[extend, setExtend]}>
			{children}
		</SideBarContext.Provider>
	);
}
export default SideBarProvider;
