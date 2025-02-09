function subscribe(store, reqPath = (state) => state, callback) {
	const sub = store.subscribe(reqPath, (data) => {
		callback(data);
	});
	return {
		cancel() {
			sub();
			console.log("Unsubscribed");
		}
	};
}

export default subscribe;
