import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import ErrorIcon from "@mui/icons-material/Error";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import { useState } from "react";

function Sidebar() {
	const [extend, setExtend] = useState(false); /// 1 hien, 2. full , 3. ko xh
	return (
		<>
			<div className={`sidebar ${extend && "sidebar--extend"}`}>
				<div
					className={`sidebar__top ${
						extend && "sidebar__top--extend"
					}`}
				>
					<button
						className="button button__main button__bg-tran"
						onClick={() => {
							setExtend((x) => !x);
						}}
					>
						<MenuIcon></MenuIcon>
					</button>
					<button className={`button button__fab`}>
						<AddIcon></AddIcon>
						{extend && <span className="font-6">New chat</span>}
					</button>
				</div>
				<div
					className={`sidebar__bottom ${
						extend && "sidebar__bottom--extend"
					}`}
				>
					<button
						className="button button__main button__bg-tran"
						extended={extend ? "true" : null}
					>
						<ErrorIcon></ErrorIcon>
						{extend && <span className="font-6">Report</span>}
					</button>
					<button
						className="button button__main button__bg-tran"
						extended={extend ? "true" : null}
					>
						<WatchLaterOutlinedIcon></WatchLaterOutlinedIcon>
						{extend && <span className="font-6">Activity</span>}
					</button>
					<button
						className="button button__main button__bg-tran"
						extended={extend ? "true" : null}
					>
						<SettingsOutlinedIcon></SettingsOutlinedIcon>
						{extend && <span className="font-6">Settings</span>}
					</button>
					<div className="sidebar__addition ip">
						{extend && (
							<div className="ip__main">
								<CircleIcon sx={{ fontSize: 10 }}></CircleIcon>
								<div className="ip__data">
									<p className="ip__location font-7">
										Di An, Binh Duong, Vietnam
									</p>
									<p className="ip__note font-4">
										From your IP address
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
export default Sidebar;
