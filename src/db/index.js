import { child, get, onValue, set } from "firebase/database";
import root, { db } from "./config";
import initChat from "./initChat";

// checkDatabase existanse
async function checkFromDatabase(chatID, userID) {
	const path = "users/" + userID + "/chat/" + chatID;
	const userRef = child(root, path);
	const snapshot = await get(userRef);
	// console.log(path, snapshot.exists());
	return snapshot.exists();
}
async function checkExistance(chatID, chatList, userID) {
	if (chatList.findIndex((x) => x == chatID) >= 0) {
		return true;
	} else {
		// console.log("check from database");
		return checkFromDatabase(chatID, userID);
	}
}
// push new Chat
async function newChat(chatID, userID, callback) {
	const user = "users/" + userID + "/chat/" + chatID;
	const chat = "chats/" + chatID;

	const userRef = child(root, user);
	const chatRef = child(root, chat);
	try {
		const setFromUser = set(userRef, true);
		const setFromChat = set(chatRef, initChat(userID));
		Promise.all([setFromChat, setFromUser])
			.then(() => {
				callback();
			})
			.catch((e) => {
				//console.log(e);
				throw new Error(e);
			});
	} catch (error) {
		throw new Error(error);
	}
}
// load previous messages in a chat
async function loadChat(chatID, userID, callback = () => {}) {
	const path = "chats/" + chatID;
	const chatRef = child(root, path);

	try {
		onValue(
			chatRef,
			(snapshot) => {
				if (!snapshot.exists()) throw new Error(error);
				const list = snapshot.val();
				callback(list);
			},
			{ onlyOnce: true }
		);
	} catch (error) {
		throw new Error(error);
	}
}

export { checkExistance, newChat, loadChat };
