const apiKey = import.meta.env.VITE_DATABASE_API;
const authDomain = import.meta.env.VITE_DATABASE_AUTH;
const projectId = import.meta.env.VITE_DATABASE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_DATABASE_BUCKET;
const messagingSenderId = import.meta.env.VITE_DATABASE_SENDER_ID;
const appId = import.meta.env.VITE_DATABASE_APP_ID;

const config = {
	apiKey,
	authDomain,
	projectId,
	storageBucket,
	messagingSenderId,
	appId,
	databaseURL:
		"https://gemini-clone-a8b9f-default-rtdb.asia-southeast1.firebasedatabase.app"
};

export default config;
