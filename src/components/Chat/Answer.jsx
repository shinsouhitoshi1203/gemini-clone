import DataAnswer from "./Answer/DataAnswer";
import WaitForAnswer from "./Answer/WaitForAnswer";
function Answer({ chatData }) {
	return (
		<>
			<div className="ChatBox__Chat-Answer">
				<div className="ChatBox__user">
					<img src="/gemini.png" alt="" />
				</div>
				<div className="ChatBox__message">
					{chatData ? (
						<DataAnswer msg={chatData.answer} />
					) : (
						<WaitForAnswer />
					)}
				</div>
			</div>
		</>
	);
}
export default Answer;
