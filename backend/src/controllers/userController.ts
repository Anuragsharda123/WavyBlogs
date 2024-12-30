import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Response } from "express";
import { Local } from "../environment/env";
import Wave from "../models/Wave";
import Preference from "../models/Preference";

const SECRET_KEY:any = Local.SECRET_KEY

export const userList = async(req:any, res:Response) => {
    await Preference.findAll();
    try{
        await User.findAll();
    }
    catch(err){
        res.status(500).json({'message': 'Something went wrong'})
    }
}

export const userLogin = async(req:any, res:Response) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({where: {email: email}});
        if(!user){
            res.status(401).json({'message': 'Invalid email'});
        }
        else{
            const isValid = await bcrypt.compare(password, user.password);
            if(!isValid){
                res.status(401).json({'message': 'Wrong password'});
            }
            else{
                const token = jwt.sign({uuid: user.uuid}, SECRET_KEY, {expiresIn: '1h'});
                res.status(200).json({'message': 'Login successful', "token": token, "user":user});
            }
        }
    }
    catch(err){
        res.status(500).json({'message': 'Something went wrong'})
    }
}

export const Register = async(req:any, res:Response) => {
    try{
        const {firstname, lastname, email, password, phone} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            phone
        });
        
        res.status(200).json({'message': 'User created successfully', "user": user});
    }
    catch(err){
        res.status(500).json({'message': 'Something went wrong'})
    }
}