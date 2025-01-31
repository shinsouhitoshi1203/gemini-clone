import {
	GLOBAL_SET_USER,
	GLOBAL_SET_SETTINGS,
	GLOBAL_SET_HISTORY,
	GLOBAL_SET_BACK
} from "./action";
function reducer(data, action) {
	const { type, payload } = action;
	switch (type) {
		case GLOBAL_SET_HISTORY: {
            
		}
		default:
			return data;
	}
}
export default reducer;
