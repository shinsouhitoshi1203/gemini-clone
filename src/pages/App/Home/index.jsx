import Input from "./Input";
import Hyperlink from "../../../components/Hyperlink";

// styling
import "./../../../assets/scss/pages/Home/Home.scss";
// hooks
import { Outlet } from "react-router-dom";

function Home() {
	return (
		<div className="pageHome router">
			<div className="pageHome__display">
				<div className="page__wrapper">
					<Outlet />
				</div>
			</div>
			<div className="pageHome__input">
				<div className="page__wrapper">
					<Input />
					<p className="pageHome__disclaimer font-4">
						Gemini may display inaccurate info, including about
						people, so double-check its responses.
						<Hyperlink
							href="/privacy"
							text="Your privacy & Gemini Apps"
							cls="pageHome__privacy"
						/>
					</p>
				</div>
			</div>
		</div>
	);
}
export default Home;
