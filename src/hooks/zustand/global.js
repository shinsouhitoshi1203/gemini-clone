import { create } from "zustand";
import req from "./req";
const idVersion = import.meta.env.VITE_APP_VERSION;
const useGlobal = create((set, get) => {
	return {
		// default
		loggedIn: false,
		app: {
			avatar: "./gemini.png",
			version: idVersion,
			name: "gemini-clone"
		},
		settings: {
			theme: "light",
			safeChat: false
		},
		user: {
			info: {},
			settings: {},
			history: []
		},
		// settings
		loadUser: (info, settings, history) => {
			set({
				loggedIn: true,
				user: {
					info,
					settings,
					history
				}
			});
		},
		reset: () => {
			set({
				loggedIn: false,
				settings: { theme: "light", safeChat: false },
				user: {
					info: {},
					settings: {},
					history: []
				}
			});
		}
	};
});
export default useGlobal;
/* 

info: {
    id: "123456",
    nickname: "midoriyaizuku",
    avatar: "https://pbs.twimg.com/media/DDoHG8aVYAAnTE8.jpg"
},
settings: {},
history: []

*/
