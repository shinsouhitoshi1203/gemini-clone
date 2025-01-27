import remarkGfm from "remark-gfm";
import useHome from "../../../hooks/useHome";
import Button from "../../Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Markdown from "markdown-to-jsx";
import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState
} from "react";
import { Scrl } from "../../../pages/Home/Home";

function DataAnswer({ msg, req }) {
	// actualText
	const scroll = useContext(Scrl);
	const [displayText, setDisplayText] = useState("");
	const wordList = useMemo(() => {
		return msg.split(" ");
	}, []);

	useEffect(() => {
		if (req) {
			async function fn() {
				for (let i = 0; i < wordList.length; ++i) {
					await new Promise((ok, nope) => {
						setTimeout(() => {
							scroll.current.scrollTo(
								0,
								scroll.current.scrollHeight
							);
							ok();
						}, 60);
					});
					setDisplayText((x) => x + " " + wordList[i]);
				}
			}
			fn();
		}
	}, []);
	return (
		<>
			<div className="ChatBox__answer">
				<Markdown
					// remarkPlugins={[remarkGfm]}
					style={{ font: "initial" }}
					children={req ? displayText : msg}
				/>
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
