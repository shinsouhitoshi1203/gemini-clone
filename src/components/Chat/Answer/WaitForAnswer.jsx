import useHome from "../../../hooks/useHome";
import DataAnswer from "./DataAnswer";
import Loading from "./Loading";

function WaitForAnswer() {
	const { data } = useHome();
	return (
		<>
			{data.allowLoading ? (
				<Loading />
			) : !data.mustStop ? (
				<DataAnswer msg={data.response} req={true} />
			) : (
				<div className="ChatBox__cancelled">
					The response display is suspended as the user pressed to
					stop receiving the message
				</div>
			)}
		</>
	);
}
export default WaitForAnswer;
