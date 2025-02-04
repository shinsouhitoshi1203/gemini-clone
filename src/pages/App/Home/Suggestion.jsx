import CardBase from "../../../components/CardBase";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import useGlobal from "../../../hooks/zustand/global";

function Suggestion() {
	const history = useGlobal((state) => state.user.history);
	return (
		<>
			{history.length > 0 &&
				history.map((txt, i) => (
					<CardBase
						cls="welcome__suggestion-card"
						size="254 226 12 16"
						key={i}
					>
						<div className="welcome__suggestion-card-wrapper">
							<div className="welcome__suggestion-grow">
								<div>
									<p className="welcome__suggestion-text font-4">
										{11111}
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
