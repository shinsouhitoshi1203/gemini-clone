import Welcome from "./Welcome";
import Input from "./Input";
import Hyperlink from "../../../components/Hyperlink";

// sub-page
import Chatbox from "./Chatbox";
// styling
import "./../../../assets/scss/pages/Home/Home.scss";
// hooks
import useHome from "../../../hooks/useHome";

function Home() {
	const { data } = useHome();

	return (
		<div className="pageHome router">
			<div className="pageHome__display">
				<div className="page__wrapper">
					{data.allowChat ? <Chatbox /> : <Welcome />}
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
