import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
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
				<div className="welcome__suggestions">
					<a href="#!" className="welcome__suggestion-card">
						<p>Generate unit tests for the following C# function</p>
						<span className="welcome__global-icon">
							<LanguageOutlinedIcon />
						</span>
					</a>
				</div>
			</div>
		</>
	);
}
export default Welcome;
