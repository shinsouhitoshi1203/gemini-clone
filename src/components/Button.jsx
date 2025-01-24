import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
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
	const styles = { ...style };
	if (size) {
		const [w, h, rs] = size.trim().split(" ");
		styles.width = w;
		if (h == "+") {
			styles.minWidth = parseInt(w);
			// styles.width = parseInt(w);
		} else {
			styles.width = parseInt(h);
		}
		styles.borderRadius = rs ? parseInt(rs) : parseInt(w) / 2;
		styles.height = parseInt(w);
	}

	// detect type of buttons
	const { tran, cls, ...events } = rest;
	let identify = `button__${type} ${tran ? "button__bg-tran" : ""} ${cls}`;

	// icon or avatar
	let avatarImg;
	if (type == "user") {
		avatarImg = avatar ? (
			<img src={{ avatar }} alt="Your account" />
		) : (
			<AccountCircleOutlinedIcon />
		);
	}
	return (
		<>
			<button
				style={styles}
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
export default Button;
