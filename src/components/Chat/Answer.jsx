import DataAnswer from "./Answer/DataAnswer";
import WaitForAnswer from "./Answer/WaitForAnswer";
function Answer({ data }) {
	return (
		<>
			<div className="ChatBox__Chat-Answer">
				<div className="ChatBox__user">
					<img src="/gemini.png" alt="" />
				</div>
				<div className="ChatBox__message">
					{data ? (
						<DataAnswer msg={data.answer} />
					) : (
						<WaitForAnswer />
					)}
				</div>
			</div>
		</>
	);
}
export default Answer;
