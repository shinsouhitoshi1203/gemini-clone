import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import ContrastIcon from "@mui/icons-material/Contrast";
import "./index.scss";
import { ListSubheader, Switch } from "@mui/material";
export default function Test() {
	return (
		<>
			<div className="box">
				<List
					subheader={<div className="box__header">Settings</div>}
					sx={{ fontSize: "14px" }}
				>
					<ListItem>
						<ListItemIcon sx={{ minWidth: "40px" }}>
							<ContrastIcon sx={{ fontSize: 24 }} />
						</ListItemIcon>
						<ListItemText primary="Theme" className="aaa" />
						<Switch edge="end" />
					</ListItem>
				</List>
			</div>
		</>
	);
}
