import { useEffect, useRef } from "react";
function setSize(bg, size) {
	const styles = {};
	if (size) {
		const [w, h, rs, p] = size.trim().split(" ");
		styles.width = w;
		if (h == "+") {
			styles.minWidth = parseInt(w);
		} else {
			styles.width = parseInt(h);
		}
		styles.borderRadius = rs ? parseInt(rs) : 10;
		styles.height = parseInt(w);
		styles.padding = parseInt(p);
	} else {
		throw new Error("Invalid CardBase calling");
	}
	if (bg != "default") {
		styles.backgroundColor = bg;
	}
	return styles;
}
function manageBG(bg, cls) {
	let x = "cardBase " + cls + " ";
	if (bg) {
		if (bg == "default") {
			x += " cardBase__default ";
		}
		// } else {
		//     styles.current = { ...styles.current, backgroundColor: bg };
		// }
	} else {
		x += " cardBase__default ";
	}
	return x;
}
function CardBase({ cls, children, size, style, bg }) {
	const classList = useRef(manageBG(bg, cls));
	const styles = useRef({ ...style, ...setSize(bg, size) });

	return (
		<>
			<button className={classList.current} style={styles.current}>
				{children}
			</button>
		</>
	);
}
export default CardBase;
