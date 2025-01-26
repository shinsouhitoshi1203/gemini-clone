import Input from "./Input";
import Welcome from "./Welcome";
import "./../../assets/scss/pages/Home/Home.scss";
import HyperLink from "../../components/Hyperlink";
function Home() {
	return (
		<div className="pageHome router">
			<div className="pageHome__display">
				<div className="page__wrapper">
					<Welcome />
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
