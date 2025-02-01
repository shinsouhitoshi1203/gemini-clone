export default async function req(path, id) {
	const host = import.meta.env.VITE_APP_SERVER;
	// console.log(host, "is fetching . . . ", path);
	const reqPath = host + (path == "" ? "current" : path + "/" + id);
	try {
		const response = await fetch(reqPath);
		if (response.ok) {
			return await response.json();
		} else {
			const { status, statusText } = response;

			throw new Error(status, ":", statusText);
		}
	} catch (e) {
		console.log(e);
		return "ERROR";
	}
}

// localhost:3000/user/<id>
// localhost:3000/chat_history/<id>
// localhost:3000/settings/<id>
