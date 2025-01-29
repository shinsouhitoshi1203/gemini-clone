import processGPT from "../config/gemini";
async function requestGPT(msg) {
    try {
        const res = await requestGPT(msg);
        console.log(res)
        return res;
    } catch (error) {

    }
}

export default requestGPT