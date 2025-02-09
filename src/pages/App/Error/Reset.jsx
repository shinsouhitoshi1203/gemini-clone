import { useEffect } from "react";
import Error from ".";
import useGlobal from "../../../hooks/zustand/global";

function Reset() {
	const reset = useGlobal((x) => x.reset);
	useEffect(reset, []);
	return (
		<>
			<Error />
		</>
	);
}
export default Reset;
