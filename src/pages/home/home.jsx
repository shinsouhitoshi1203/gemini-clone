import Input from "./Input";
import Welcome from "./Welcome";
import "./../../assets/scss/pages/Home/Home.scss";
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
				</div>
			</div>
		</div>
	);
}
export default Home;
