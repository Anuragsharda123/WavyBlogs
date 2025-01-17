interface config{
    BASE_URL: string;
    CREATE_USER: string;
    AUTH_USER: string;
    CREATE_WAVE: string;
    GET_MY_WAVES: string;
    GET_REQUESTS: string;
    INVITE_FRIEND: string;
    SECRET_KEY: string;
    GET_LATEST_WAVES:string;
}
// console.log("--------->", import.meta.env.VITE_BASE_URL)
const Local:config = {
    BASE_URL: import.meta.env.VITE_BASE_URL,
    CREATE_USER: import.meta.env.VITE_CREATE_USER,
    AUTH_USER: import.meta.env.VITE_AUTH_USER,
    CREATE_WAVE: import.meta.env.VITE_CREATE_WAVE,
    GET_MY_WAVES: import.meta.env.VITE_GET_MY_WAVES,
    GET_REQUESTS: import.meta.env.VITE_GET_REQUESTS,
    INVITE_FRIEND: import.meta.env.VITE_INVITE_FRIEND,
    SECRET_KEY: import.meta.env.VITE_CRYPTO_SECRET_KEY,
    GET_LATEST_WAVES: import.meta.env.VITE_GET_LATEST_WAVES
}

export default Local