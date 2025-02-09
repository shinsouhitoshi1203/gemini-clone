import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
const idVersion = import.meta.env.VITE_APP_VERSION;
const useGlobal = create(
	subscribeWithSelector((set, get) => {
		return {
			// default
			loggedIn: false,
			app: {
				avatar: "/gemini.png",
				version: idVersion,
				name: "gemini-clone"
			},
			settings: {
				theme: "light",
				safeChat: false
			},
			currentUser: "",
			user: {
				info: {},
				settings: {},
				history: [] // contain list of history only!
				/* 
                    history: [
                        {
                            id: "123456",
                            topic: "math"
                        }
                    ]
                */
			},
			// settings
			loadUser: (info, settings, history) => {
				set({
					loggedIn: true,
					user: {
						info,
						settings,
						history
					},
					currentUser: info.id
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
					},
					currentUser: ""
				});
			},
			setHistory() {},
			pushHistory(ID, topic) {
				set((state) => {
					const history = state.user.history.slice();
					history.push({ chatID: ID, topic: topic });
					return {
						user: { ...state.user, history }
					};
				});
			}
		};
	})
);

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
