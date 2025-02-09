import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { memo, useEffect, useRef } from "react";

function setSize(size) {
	const styles = {};
	if (size) {
		const [w, h, rs] = size.trim().split(" ");
		// styles.width =  parseInt(w);
		if (h == "+") {
			styles.minWidth = parseInt(w);
			styles.height = parseInt(w);
		} else {
			styles.width = parseInt(w);
			styles.height = parseInt(h);
		}
		styles.borderRadius = rs ? parseInt(rs) : parseInt(w) / 2;
	}
	return styles;
}
function Button(props) {
	// destructuring
	const {
		type,
		caption,
		tooltip,
		children,
		icon,
		avatar,
		reqExtend,
		size,
		style,
		...rest
	} = props;

	// get the size {w, h, bdrs}
	const styles = useRef({ ...style, ...setSize(size) });

	// detect type of buttons
	const { tran, cls, ...events } = rest;
	let identify = `button__${type} ${tran ? "button__bg-tran" : ""} ${cls}`;

	// icon or avatar
	let avatarImg;
	if (type == "user") {
		avatarImg = avatar ? (
			<img src={avatar} alt="Your account" width={"100%"} />
		) : (
			<AccountCircleOutlinedIcon />
		);
	}
	// console.log(styles.current);
	return (
		<>
			<button
				style={styles.current}
				className={`button ${identify} `}
				extended={reqExtend ? "true" : null}
				{...events}
			>
				{icon ?? avatarImg}
				{reqExtend && <span className="font-6">{caption}</span>}
			</button>
		</>
	);
}
export default memo(Button);
