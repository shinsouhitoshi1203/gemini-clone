import useInteract from "../hooks/zustand/interact";

const interact = {
	sidebar: {
		toggle(value) {
			if (typeof value == "boolean")
				useInteract.setState((state) => ({
					sidebar: {
						...state.sidebar,
						extend: value
					}
				}));
			else
				useInteract.setState((state) => ({
					sidebar: {
						...state.sidebar,
						extend: !state.sidebar.extend
					}
				}));
		}
	},
	scroll: {
		trigger(value = true) {
			useInteract.setState((state) => ({
				scroll: {
					...state.scroll,
					need: true
				}
			}));
		},
		set padding(padding) {
			useInteract.setState((state) => ({
				scroll: {
					...state.scroll,
					padding
				}
			}));
		}
	}
};
export default interact;
