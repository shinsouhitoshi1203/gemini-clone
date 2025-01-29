import createRequest from "../createRequest";
import {
	GEMINI_PREPARE,
	GEMINI_READY,
	//GEMINI_ERROR,
	GEMINI_FINISH,
    GEMINI_STOP_RESPONSING,
	// GEMINI_APPEAR_EACH
} from "./actions";

function reducer(data, action) {
	const { type, payload } = action;
	switch (type) {
		case GEMINI_READY: {
			// payload is the message
            if (payload) {
                return {
                    ...data,
                    response: payload,
                    allowLoading: false,
                    allowAnimation: true,
                    allowForceStop: true
                };
            } else {
                throw new Error ("breh")
            }
            
		}
		case GEMINI_PREPARE: {
			// prepare for sending request
			return {
				...data,
                recent: payload,
				allowChat: true,
				response: "",
				allowLoading: true,
				allowAnimation: false,
                mustStop: false,
                allowForceStop: false,
			};
		}
		case GEMINI_FINISH: {
            if (!data.mustStop) {
                return {
                    ...data,
                    allowAnimation: false,
                    allowForceStop: false,
                    mustStop: false,
                };
            } else {
                return {...data}
            }
			
		}
        case GEMINI_STOP_RESPONSING: {
            if (data.allowAnimation) {
                return {
                    ...data,
                    allowForceStop: false,
                    allowAnimation: false,
                    mustStop: true,
                    response: ""
                };
            
            } else {
                return {...data}
            }
		}	
        
		default:
			return data;
	}
}

export default reducer;

/* 
    I. wait for response
        1. allowChat
        2. clearOldResponse
        3. allowLoading
        4. !allowAnimation
        5. recent = input
        6. [await] send reques
    II. show response
        1. !allowLoading
        2. allowAnimation

            . !openOption [local state from Chat comp.]
    III. open option
        1. !allowAnimation
        2. openOption [local state from Chat comp.]
*/
