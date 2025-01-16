import CryptoJS from 'crypto-js';
import { Local } from '../environment/env';

export const loginTemplate = (userFirstname:string, userLastname:string, friendEmail:string, message:string) => {
    const encrypteddata = CryptoJS.AES.encrypt(`${friendEmail}`, Local.CRYPTO_SECRET_KEY).toString();
    const Link = `${Local.BASE_URL}/${Local.LOGIN_URL}/${encrypteddata}`
    return `<b>${userFirstname} ${userLastname}</b> sent you a request to connect with him at WavyBlogs by clicking on below link </br> Message by <b>${userFirstname} ${userLastname}</b> for you: ${message} <br><br> ${Link}`
}