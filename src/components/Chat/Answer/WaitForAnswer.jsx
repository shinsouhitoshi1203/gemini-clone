import useChat from "../../../hooks/zustand/chat";
import useGlobal from "../../../hooks/zustand/global";
import Loading from "./Loading";

function WaitForAnswer() {
	const { allowLoading } = useChat();
	const avatar = useGlobal((x) => x.app.avatar);
	return (
		<>
			{allowLoading && (
				<div className="ChatBox__Chat-Answer ChatBox__Chat">
					<div className="ChatBox__user">
						<img src={avatar} alt="" />
					</div>
					<div className="ChatBox__message">
						<Loading />
					</div>
				</div>
			)}
		</>
	);
}
export default WaitForAnswer;
