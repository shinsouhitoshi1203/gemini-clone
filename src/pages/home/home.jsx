import Welcome from "./Welcome";
import Input from "./Input";
import HyperLink from "../../components/Hyperlink";
// contexts
import HomeProvider from "../../contexts/HomeProvider";
// styling
import "./../../assets/scss/pages/Home/Home.scss";
import useHome from "../../hooks/useHome";
import Chatbox from "./Chatbox";
function Home() {
	const { allowChat } = useHome();
	return (
		<div className="pageHome router">
			<div className="pageHome__display">
				<div className="page__wrapper">
					{allowChat ? <Chatbox /> : <Welcome />}
				</div>
			</div>
			<div className="pageHome__input">
				<div className="page__wrapper">
					<Input />
					<p className="pageHome__disclaimer font-4">
						Gemini may display inaccurate info, including about
						people, so double-check its responses.
						<HyperLink
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
