import jwt from 'jsonwebtoken';
import Local from '../environment/env';

const Secret:any = Local.SECRET_KEY;

const userAuthMiddleware = async(token:any) => {
    // console.log("token", token)
    if(!token){
        return;
    }
    jwt.verify(token, Secret, (err:any, data:any)=>{
        if(err){
            return err;
        }
        return data;
    });
};

export default userAuthMiddleware;
