import { child, equalTo, get, orderByChild, query } from "firebase/database";
import root from "../config";

async function testFunction() {
	const historyRef = child(root, "/chats");
	const snapshot = query(historyRef);
	console.log(snapshot.exist());
}

export default testFunction;
