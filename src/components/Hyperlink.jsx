function HyperLink({ href, text, children, cls }) {
	return (
		<a href={href} title={text} className={cls}>
			{children ? children : text}
		</a>
	);
}
export default HyperLink;
