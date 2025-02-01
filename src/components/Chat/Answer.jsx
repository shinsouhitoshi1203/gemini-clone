import useGlobal from "../../hooks/zustand/global";
import DataAnswer from "./Answer/DataAnswer";
import WaitForAnswer from "./Answer/WaitForAnswer";
function Answer({ chatData }) {
	const { avatar } = useGlobal((x) => x.app);

	return (
		<>
			<div className="ChatBox__Chat-Answer">
				<div className="ChatBox__user">
					<img src={avatar} alt="" />
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
