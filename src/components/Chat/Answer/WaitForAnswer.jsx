import useHome from "../../../hooks/useHome";
import DataAnswer from "./DataAnswer";
import Loading from "./Loading";

function WaitForAnswer() {
	const { data } = useHome();
	return (
		<>
			{data.allowLoading ? (
				<Loading />
			) : (
				<DataAnswer msg={data.response} req={true} />
			)}
		</>
	);
}
export default WaitForAnswer;
