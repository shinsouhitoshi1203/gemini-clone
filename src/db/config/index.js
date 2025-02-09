import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import config from "./_base";

/* var admin = import("firebase-admin");

var serviceAccount = import("/secret/service.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL:
		"https://gemini-clone-a8b9f-default-rtdb.asia-southeast1.firebasedatabase.app"
}); */
const app = initializeApp(config);
const db = getDatabase(app);
const root = ref(db, "/");
export { db };
export default root;
