import { Outlet } from "react-router-dom";
import router from "./router";
import useUserChat, { convert } from "./hooks/zustand/userChat";

// debugging state

function App() {
	// const chats = useUserChat();
	// useUserChat.subscribe(
	// 	(state) => state.chats,
	// 	(chats) => {
	// 		console.log("chatState updated:");
	// 		console.log(chats);
	// 		console.log("updated with Render:");
	// 		console.log(convert.toSee(chats));
	// 		console.log("");
	// 		console.log("");
	// 	}
	// );
	return <Outlet />;
}
export default App;
