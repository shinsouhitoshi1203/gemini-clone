import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState
} from "react";
import useHome from "../hooks/useHome";

function mergeClass(cls) {
	return cls + " " + "TextBox";
}
function TextBox({ cls, children, right, left, placeholder, ...rest }) {
	const id = useRef(window.crypto.randomUUID());
	const { input, setInput } = useHome();
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
						<div className="TextBox__button" key={i}>
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
					{...rest}
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
