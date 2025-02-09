import { memo, useCallback, useRef } from "react";

function mergeClass(cls) {
	return cls + " " + "TextBox";
}

function TextBox({
	cls,
	children,
	right,
	left,
	placeholder,
	input,
	setInput,
	disabled,
	...rest
}) {
	const id = useRef(window.crypto.randomUUID());
	// console.log(disabled);
	const changeText = useCallback(
		(e) => {
			setInput(e.target.value);
		},
		[input]
	);
	return (
		<div className={mergeClass(cls)}>
			<label className="TextBox__wrapper" htmlFor={id.current}>
				{left &&
					left.map((component, i) => (
						<div
							className="TextBox__button"
							key={i}
							disabled={disabled}
						>
							{component}
						</div>
					))}
				<input
					type="text"
					value={input}
					onChange={(e) => {
						changeText(e);
					}}
					className="TextBox__input"
					placeholder={placeholder}
					id={id.current}
					disabled={disabled}
					{...rest}
				/>
				{right &&
					right.map((component, i) => (
						<div
							className="TextBox__button"
							key={i}
							disabled={disabled}
						>
							{component}
						</div>
					))}
				{children}
			</label>
		</div>
	);
}
export default memo(TextBox);
