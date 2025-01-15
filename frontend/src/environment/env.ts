interface config{
    BASE_URL: string;
    CREATE_USER: string;
    AUTH_USER: string;
}
// console.log("--------->", import.meta.env.VITE_BASE_URL)
const Local:config = {
    BASE_URL: import.meta.env.VITE_BASE_URL,
    CREATE_USER: import.meta.env.VITE_CREATE_USER,
    AUTH_USER: import.meta.env.VITE_AUTH_USER,
}

export default Local