import { useRef } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Select({ caption, data, children }) {
	const id = useRef(window.crypto.randomUUID());
	return (
		<>
			<button className="select-input" select-input-id={id.current}>
				<span className="select-input__caption font-5">{caption}</span>
				<ArrowDropDownIcon sx={{ fontSize: 20 }}></ArrowDropDownIcon>
			</button>
		</>
	);
}
export default Select;
