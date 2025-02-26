import { child, get, onValue, push, set, update } from "firebase/database";
import root, { db } from "./config";
import initChat from "./initChat";
import { status } from "../code/controls";
const create = {
	path(...args) {
		return args.join("/");
	}
};
console.log(create.path("users", "1", "chat", "2"));
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
		// Check the permission of the user to access the chat
		return true;
	} else {
		// console.log("check from database");
		return checkFromDatabase(chatID, userID);
	}
}
// push new Chat (conversation)
async function newChat(chatID, userID, input, callback) {
	if (!chatID || !userID) throw new Error("chatID or userID is missing");
	const user = "users/" + userID + "/chat/" + chatID;
	const chat = "chats/" + chatID;
	// console.log("Where had we done:\n", user, "\n", chat);

	const userRef = child(root, user);
	const chatRef = child(root, chat);
	try {
		const setFromUser = set(userRef, input);
		const setFromChat = set(chatRef, initChat(userID));
		Promise.all([setFromChat, setFromUser])
			.then(() => {
				callback();
			})
			.catch((e) => {
				throw new Error(e);
			});
	} catch (error) {
		throw new Error(error);
	}
}
async function setTopic(chatID, userID, topic) {
	if (!chatID || !userID) return;
	const userChat = "users/" + userID + "/chat/" + chatID;
	const userChatRef = child(root, userChat);
	const snapshot = await get(userChatRef);
	if (!snapshot.exists()) {
		console.error("The chat does not exist");
		return;
	}
	const path = "chats/" + chatID + "/";
	const chatRef = child(root, path);
	const topicRef = child(chatRef, "topic");
	try {
		await set(topicRef, topic);
		await set(userChatRef, topic);
	} catch (error) {
		throw new Error(error);
	}
}
async function tickle(chatID, messageID, userID, field, value) {
	if (!chatID || !messageID || !userID) return;
	const userChat = "users/" + userID + "/chat/" + chatID;
	const userChatRef = child(root, userChat);
	const snapshot = await get(userChatRef);
	if (!snapshot.exists()) {
		console.error("The chat does not exist");
		return;
	}
	// ////////////////////////////////////////////////
	const path = "/chats/" + chatID + "/list/" + messageID;
	const userRef = child(root, path);
	const changes = {};
	changes["/" + field] = value;
	await update(userRef, changes);
}
// load previous messages in a chat
async function loadChat(chatID, userID, callback = () => {}) {
	if (!chatID) return;
	const path = "chats/" + chatID;
	const chatRef = child(root, path);
	try {
		onValue(
			chatRef,
			(snapshot) => {
				if (!snapshot.exists())
					throw new Error("The chat does not exist");
				const list = snapshot.val();
				callback(list);
			},
			{ onlyOnce: true }
		);
	} catch (error) {
		throw new Error(error);
	}
}
// send message to both zustand and database
async function sendMessage(
	zustandCallback,
	chatID,
	message,
	role,
	callback = () => {}
) {
	// ---------------------------------
	// 1. chatID: conversation id
	// 2. messageID: message id
	// 3. userID: user id --deleted
	// 4. message: message content
	// 5. role: user or bot
	// ---------------------------------
	if (!chatID) return;
	const list = "chats/" + chatID + "/list";
	const listRef = child(root, list);
	let messageID = "";

	if (role == "user") {
		if (status.chat.ask) return;
		messageID = push(listRef).key;
		zustandCallback(messageID, message, role);
		status.chat.ask = true;
	} else {
		messageID = push(listRef).key;
		callback(messageID); // avoid glitch
		zustandCallback(messageID, message, role);
	}

	try {
		const changes = {};
		changes["/" + messageID] = {
			role,
			id: messageID,
			parts: [{ text: message }],
			cancelled: false
		};
		await update(listRef, changes);
		return messageID;
	} catch (error) {
		throw new Error(error);
	}
}

// load quickly the chat history
async function quickLoad(userID, callback = () => {}) {
	if (!userID) {
		return callback({});
	}
	const path = "/users/" + userID + "/chat";
	const chatRef = child(root, path);

	try {
		const snapshot = await get(chatRef);
		if (!snapshot.exists()) {
			return callback({});
		}
		const list = snapshot.val();
		return callback(list);
	} catch (error) {
		throw new Error(error);
	}
}

export {
	checkExistance,
	newChat,
	loadChat,
	sendMessage,
	setTopic,
	tickle,
	quickLoad
};
