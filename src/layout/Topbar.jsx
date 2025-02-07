import Button from "../components/Button";
import Select from "../components/Select";
import MenuIcon from "@mui/icons-material/Menu";
import useGlobal from "../hooks/zustand/global";
import { useCallback } from "react";
import interact from "../code/interact";
function Topbar() {
	const { user } = useGlobal();

	const shutup = useCallback(() => {
		interact.sidebar.toggle();
	}, []);
	return (
		<>
			<div className="topbar">
				<Button
					type="main"
					icon={<MenuIcon sx={{ width: 24 }} />}
					caption={""}
					reqExtend={false}
					size="30 + "
					cls="topbar__nav"
					tran={true}
					onClick={shutup}
				/>
				<Select caption="Gemini" data={[]} />
				<Button
					type="user"
					avatar={user?.info?.avatar}
					tooltip="Your account"
					size=" 32 32 "
					cls="topbar__avatar"
					tran={true}
				/>
			</div>
		</>
	);
}
export default Topbar;
