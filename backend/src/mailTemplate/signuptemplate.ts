import CryptoJS from 'crypto-js';
import { Local } from '../environment/env';

export const signupTemplate = (userFirstname:string, userLastname:string, friendEmail:string, friendFirstname:string, friendLastname:string, userUUID:string, message:string) => {
    console.log(`HUHU----> ${friendEmail}_${friendFirstname}_${friendLastname}_${userUUID}`);
    const encrypteddata = CryptoJS.AES.encrypt(`${friendEmail}_${friendFirstname}_${friendLastname}_${userUUID}`, Local.CRYPTO_SECRET_KEY).toString();
    const Link = `${Local.BASE_URL}/${encrypteddata}`
    return `<b>${userFirstname} ${userLastname}</b> invite you. Connect with him at WavyBlogs by clicking on below link </br>Message by <b>${userFirstname} ${userLastname}</b> for you: ${message} <br><br> ${Link}`
}