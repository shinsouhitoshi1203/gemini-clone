import { useCallback, useRef, useState } from "react";

function mergeClass(cls) {
	return cls + " " + "TextBox";
}
function TextBox({ cls, children, right, left, placeholder }) {
	const id = useRef(window.crypto.randomUUID());
	const [text, setText] = useState("");
	const changeText = useCallback((e) => {
		setText(e.target.text);
	}, []);
	return (
		<div className={mergeClass(cls)}>
			<label className="TextBox__wrapper" htmlFor={id.current}>
				{left &&
					left.map((component, i) => (
						<div className="TextBox__button" key={i}>
							{component}
						</div>
					))}
				<input
					type="text"
					value={text}
					onChange={changeText}
					className="TextBox__input"
					placeholder={placeholder}
					id={id.current}
				/>
				{right &&
					right.map((component, i) => (
						<div className="TextBox__button" key={i}>
							{component}
						</div>
					))}
				{children}
			</label>
		</div>
	);
}
export default TextBox;
