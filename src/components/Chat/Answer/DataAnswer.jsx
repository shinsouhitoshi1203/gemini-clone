import Options from "./Options";
import RawAnswer from "./RawAnswer";

function DataAnswer({ msg, req }) {
	return (
		<>
			<div className="ChatBox__answer">
				{req ? (
					<RawAnswer needDelay={true} text={msg} />
				) : (
					<RawAnswer text={msg} />
				)}
			</div>
			<div className="ChatBox__Options">
				<Options />
			</div>
		</>
	);
}
export default DataAnswer;
