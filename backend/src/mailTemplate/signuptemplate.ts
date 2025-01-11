import CryptoJS from 'crypto-js';
import { Local } from '../environment/env';

export const signupTemplate = (userFirstname:string, userLastname:string, friendEmail:string, friendFirstname:string, friendLastname:string, userUUID:string) => {
    const encrypteddata = CryptoJS.AES.encrypt(`${friendEmail}-${friendFirstname}-${friendLastname}-${userUUID}`, Local.CRYPTO_SECRET_KEY).toString();
    const Link = `${Local.BASE_URL}/${Local.SIGNUP_URL}/${encrypteddata}`
    return `<b>${userFirstname} ${userLastname}</b> invite you to connect with him at WavyBlogs by clicking on below link </br></br> ${Link} `
}