import Button from "../components/Button";
import Select from "../components/Select";
import MenuIcon from "@mui/icons-material/Menu";
function Topbar() {
	return (
		<>
			<div className="topbar">
				<Button
					type="main"
					icon={<MenuIcon />}
					caption={""}
					reqExtend={false}
					size="30 + "
					cls="topbar__nav"
					tran={true}
				/>
				<Select caption="Gemini" data={[]} />
			</div>
		</>
	);
}
export default Topbar;
