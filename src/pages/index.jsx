import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FakeChat from "./Fallback";

function RootPage() {
	const navigate = useNavigate();
	// check if this is /landing ==> [move to landing]
	// if this is "/" ==> check if there is userID ==> OK, move to app, else, [move to landing page]
	const r = useRef(false);
	useEffect(() => {
		if (r.current) return;
		navigate("/app", { replace: true });
		r.current = true;
	}, []);
	return (
		<>
			<FakeChat />
		</>
	);
}
export default RootPage;
