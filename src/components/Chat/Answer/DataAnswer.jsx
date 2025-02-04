import Options from "./Options";
import RawAnswer from "./RawAnswer";
import useHome from "../../../hooks/useHome";
import { useMemo, useRef } from "react";
function DataAnswer({ msg, req }) {
	const { data } = useHome();

	// console.log(answerNoAnimation.current);
	const allowShowingOption = useMemo(() => {
		if (req) {
			return !data.allowAnimation;
		} else {
			return true;
		}
	}, [data]);
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
				{allowShowingOption && <Options />}
			</div>
		</>
	);
}
export default DataAnswer;
