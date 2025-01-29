import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import ErrorIcon from "@mui/icons-material/Error";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import { useState } from "react";
import Button from "../components/button";
import useSideBar from "../hooks/useSideBar";

function Sidebar() {
	const [extend, setExtend] = useSideBar();
	return (
		<>
			{extend && (
				<div
					className="sidebar__wrap"
					onClick={() => {
						setExtend(false);
					}}
				></div>
			)}
			<nav className={`sidebar${extend ? " sidebar--extend" : ""}`}>
				<div
					className={`sidebar__top ${
						extend && "sidebar__top--extend"
					}`}
				>
					<Button
						type="main"
						tran={true}
						size="48 48"
						caption=""
						tooltip="Open sidebar"
						icon={<MenuIcon />}
						onClick={() => {
							setExtend((x) => !x);
						}}
					/>
					<Button
						type="fab"
						caption="New chat"
						tooltip="New chat"
						icon={<AddIcon />}
						reqExtend={extend}
					/>
				</div>
				<div
					className={`sidebar__bottom ${
						extend && "sidebar__bottom--extend"
					}`}
				>
					<Button
						type="main"
						tran={true}
						size="48 +"
						caption="Report"
						tooltip="Report"
						icon={<ErrorIcon />}
						reqExtend={extend}
					/>
					<Button
						type="main"
						tran={true}
						size="48 +"
						caption="Activity"
						tooltip="Activity"
						icon={<WatchLaterOutlinedIcon />}
						reqExtend={extend}
					/>
					<Button
						type="main"
						tran={true}
						size="48 +"
						caption="Settings"
						tooltip="Settings"
						icon={<SettingsOutlinedIcon />}
						reqExtend={extend}
					/>

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
			</nav>
		</>
	);
}
export default Sidebar;
