import Button from "../../Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { memo } from "react";
function Options() {
	return (
		<>
			<Button
				size="36 36 50%"
				caption="Like this answer"
				icon={<ThumbUpIcon />}
				type="main"
			></Button>
			<Button
				size="36 36 50%"
				caption="Like this answer"
				icon={<ThumbDownIcon />}
				type="main"
			></Button>
			<Button
				size="36 36 50%"
				caption="Like this answer"
				icon={<ShareIcon />}
				type="main"
			></Button>
			<Button
				size="36 36 50%"
				caption="Like this answer"
				icon={<VolumeUpIcon />}
				type="main"
			></Button>
			<Button
				size="36 36 50%"
				caption="Like this answer"
				icon={<MoreVertIcon />}
				type="main"
			></Button>
		</>
	);
}
export default memo(Options);
