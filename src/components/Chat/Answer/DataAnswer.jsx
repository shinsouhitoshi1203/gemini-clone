import Markdown from "react-markdown";
import useHome from "../../../hooks/useHome";
import Button from "../../Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
function DataAnswer({ msg }) {
	// const { response } = useHome();

	return (
		<>
			<div className="ChatBox__answer">
				<Markdown style={{ font: "initial" }}>{msg}</Markdown>
			</div>
			<div className="ChatBox__Options">
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
			</div>
		</>
	);
}
export default DataAnswer;
