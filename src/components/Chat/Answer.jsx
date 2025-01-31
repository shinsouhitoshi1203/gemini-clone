import useGlobal from "../../hooks/useGlobal";
import DataAnswer from "./Answer/DataAnswer";
import WaitForAnswer from "./Answer/WaitForAnswer";
function Answer({ chatData }) {
	const { app } = useGlobal();
	return (
		<>
			<div className="ChatBox__Chat-Answer">
				<div className="ChatBox__user">
					<img src={app.current.avatar} alt="" />
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
