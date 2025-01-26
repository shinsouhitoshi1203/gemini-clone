import Button from "../../components/Button";
import HyperLink from "../../components/Hyperlink";
import TextBox from "../../components/TextBox";
import MicIcon from "@mui/icons-material/Mic";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
function Input() {
	return (
		<>
			<TextBox
				cls="pageHome__input-real GEMINI__input"
				left={[
					<Button
						type="main"
						caption="Attach an image"
						icon={<ImageOutlinedIcon />}
						size="40 40 50%"
					/>
				]}
				placeholder="Enter a prompt here"
				right={[
					<Button
						type="main"
						caption="Input from voice"
						icon={<MicIcon />}
						size="40 40 50%"
					/>
				]}
			/>
		</>
	);
}
export default Input;
