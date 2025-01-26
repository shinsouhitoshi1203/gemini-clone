import Answer from "./Answer";
import Ask from "./Ask";

function Chat({ data }) {
	return (
		<div className="ChatBox__Chat">
			<Ask data={data} />
			<Answer data={data} />
		</div>
	);
}
export default Chat;
