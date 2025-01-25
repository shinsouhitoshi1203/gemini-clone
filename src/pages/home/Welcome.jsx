import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import CardBase from "../../components/CardBase";
const dataSample = [
	"Generate unit tests for the following C# function",
	"Help write SQL to generate a report",
	"Teach me the concept of game theory in simple terms",
	"Walk me through how to apply for a new role"
];

function Welcome() {
	return (
		<>
			<div className="welcome">
				<header className="welcome__head">
					<h1>
						<span className="welcome__head-greeting">
							Hello, {"shinsouhitoshi1203"}
						</span>
						<span className="welcome__head-asking">
							How can I help you today?
						</span>
					</h1>
				</header>
				<div className="welcome__suggestion">
					{dataSample.map((txt, i) => (
						<CardBase
							cls="welcome__suggestion-card"
							size="254 226 12 16"
							key={i}
						>
							<div className="welcome__suggestion-card-wrapper">
								<div className="welcome__suggestion-grow">
									<div>
										<p className="welcome__suggestion-text font-4">
											{txt}
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
				</div>
			</div>
		</>
	);
}
export default Welcome;
