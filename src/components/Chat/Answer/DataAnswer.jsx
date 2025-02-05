import Options from "./Options";
import RawAnswer from "./RawAnswer";
import useHome from "../../../hooks/useHome";
import { useMemo, useRef } from "react";
function DataAnswer({ msg, req }) {
	/* const { data } = useHome();
	const allowShowingOption = useMemo(() => {
		if (req) {
			return !data.allowAnimation;
		} else {
			return true;
		}
	}, [data]); */
	return (
		<>
			<div className="ChatBox__answer">
				<RawAnswer text={msg} />
				{/* {req ? (
					<RawAnswer needDelay={true} text={msg} />
				) : (
					<RawAnswer text={msg} />
				)} */}
			</div>
			<div className="ChatBox__Options">
				<Options />
				{/* {allowShowingOption && <Options />} */}
			</div>
		</>
	);
}
export default DataAnswer;
