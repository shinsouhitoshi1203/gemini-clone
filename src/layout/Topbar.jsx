import Button from "../components/Button";
import Select from "../components/Select";
import MenuIcon from "@mui/icons-material/Menu";
import useSideBar from "../hooks/useSideBar";
import useGlobal from "../hooks/zustand/global";
function Topbar() {
	const { user } = useGlobal();

	const { setExtend } = useSideBar();
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
					onClick={() => {
						setExtend((x) => !x);
					}}
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
