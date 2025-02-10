import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { styled, Tooltip, tooltipClasses } from "@mui/material";
import { memo, useEffect, useRef } from "react";
// import "./../assets/scss/components/_tooltip.scss";
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

const Tip = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(() => ({
	[`& .${tooltipClasses.tooltip}`]: {
		fontSize: "1.2rem",
		fontFamily: "var(--font)"
	}
}));

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
		placement,
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
	// console.log(placement);

	return (
		<>
			{placement == "true" ? (
				<Tip title={tooltip ?? caption} placement="right">
					<button
						style={styles.current}
						className={`button ${identify} `}
						extended={reqExtend ? "true" : null}
						{...events}
					>
						{icon ?? avatarImg}
						{reqExtend && <span className="font-6">{caption}</span>}
					</button>
				</Tip>
			) : (
				<Tip title={tooltip ?? caption}>
					<button
						style={styles.current}
						className={`button ${identify} `}
						extended={reqExtend ? "true" : null}
						{...events}
					>
						{icon ?? avatarImg}
						{reqExtend && <span className="font-6">{caption}</span>}
					</button>
				</Tip>
			)}
		</>
	);
}
export default memo(Button);
