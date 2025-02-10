import { req } from "../utils/req";
import { quickLoad } from "../db";
export async function loadUI() {
	let info, history, settings;

	const ID = await req("", "");
	if (ID == "ERROR") throw new Error("Error occured");
	info = await req("user", ID);
	if (info == "ERROR") throw new Error("Error occured");

	history = await quickLoad(ID, (list) => {
		return () => {
			if (!list) return [];
			return Object.keys(list).map((key) => {
				return { chatID: key, topic: list[key] };
			});
		};
	});
	if (history == "ERROR") throw new Error("Error occured");

	settings = await req("settings", ID);
	if (settings == "ERROR") throw new Error("Error occured");

	//console.log(info, history, settings);
	return { info, history, settings };
}
