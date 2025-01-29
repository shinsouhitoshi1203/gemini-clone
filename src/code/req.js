
import useHome from "../hooks/useHome";
import { GEMINI_PREPARE, GEMINI_READY } from "../reducers/chat/actions";
import createRequest from "../reducers/createRequest";
async function requestGPT(msg,setInput, set, send) {
    try {
        const tempInput = msg;
        set(createRequest(GEMINI_PREPARE, input));
        setInput("");
        const response = await send(tempInput);
        set(createRequest(GEMINI_READY, response));
    } catch (error) {}
}

export default requestGPT;