import Answer from "./Answer";
import Ask from "./Ask";

function Chat({ data }) {
	return (
		<div className="ChatBox__Chat">
			<Ask chatData={data} />
			<Answer chatData={data} />
		</div>
	);
}
export default Chat;
