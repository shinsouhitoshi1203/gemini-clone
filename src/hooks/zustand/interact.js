import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const useInteract = create(
	subscribeWithSelector((set, get) => ({
		theme: "light",
		sidebar: {
			extend: false
		},
		scroll: {
			need: false,
			padding: 40
		}
	}))
);

export default useInteract;
