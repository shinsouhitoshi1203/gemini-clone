import CardBase from "../../../components/CardBase";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import useGlobal from "../../../hooks/zustand/global";
import { useNavigate } from "react-router-dom";

function Suggestion() {
	const history = useGlobal((state) => state.user.history);
	const navigate = useNavigate();
	return (
		<>
			{history.length > 0 &&
				history.slice(-4).map(({ chatID, topic }) => (
					<CardBase
						cls="welcome__suggestion-card"
						size="254 226 12 16"
						key={chatID}
						onClick={() => {
							navigate("/app/" + chatID, { replace: true });
						}}
					>
						<div className="welcome__suggestion-card-wrapper">
							<div className="welcome__suggestion-grow">
								<div>
									<p className="welcome__suggestion-text font-4">
										{topic}
									</p>
								</div>
							</div>
							<div className="welcome__suggestion-icon">
								<span className="welcome__suggestion-icon-main">
									<LanguageOutlinedIcon />
								</span>
							</div>
						</div>
					</CardBase>
				))}
		</>
	);
}
export default Suggestion;
