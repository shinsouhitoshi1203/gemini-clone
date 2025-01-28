import useHome from "../../../hooks/useHome";
import DataAnswer from "./DataAnswer";
import Loading from "./Loading";

function WaitForAnswer() {
	const { loading, response } = useHome();
	return (
		<>{loading ? <Loading /> : <DataAnswer msg={response} req={true} />}</>
	);
}
export default WaitForAnswer;
