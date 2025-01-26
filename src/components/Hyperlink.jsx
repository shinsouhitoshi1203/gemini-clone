import { Link } from "react-router-dom";

function HyperLink({ href, text, children, cls }) {
	return (
		<Link to={href} title={text} className={cls}>
			{children ? children : text}
		</Link>
	);
}
export default HyperLink;
