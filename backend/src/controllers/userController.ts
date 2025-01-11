import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Response } from "express";
import { Local } from "../environment/env";
import Preference from "../models/Preference";
import sendInvitation from "../utils/mailer";
import Request from "../models/Request";
import { loginTemplate } from "../mailTemplate/loginTemplate";
import { signupTemplate } from "../mailTemplate/signuptemplate";

const SECRET_KEY:any = Local.SECRET_KEY

// post request
export const userList = async(req:any, res:Response) => {
    try{
        await User.findAll();
    }
    catch(err){
        res.status(500).json({'message': 'Something went wrong'});
    }
}

// post request
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

// post request
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

// post request
export const updateUser = async(req:any, res:Response) => {
    try{
        const uuid = req.user;
        const {firstname, lastname, email, social_security, phone, address, address_one,
            address_two, city, state, zip_code, dob, gender, martial_status, social, kids} = req.body;
        
        const user = await User.findByPk(uuid);

        const updatedUser = await user?.update({
            firstname, lastname, email, social_security, phone, address, address_one,
            address_two, city, state, zip_code, dob, gender, martial_status, social, kids
        });
        res.status(200).json({"message": "User updated successfully"});
    }
    catch(err){
        res.status(500).json({'message': 'Something went wrong'});
    }
}









// post request
export const updateProfilePhoto = async(req:any, res:Response) => {
    try{
        const uuid = req.user;
        

    }
    catch(err){
        res.status(500).json({'message': 'Something went wrong'});
    }
}






// post request
export const addorUpdatePreference = async(req:any, res:Response) => {
    try{
        const uuid = req.user;
        const { language, breakfast, lunch, dinner, wake_time, bed_time, weight_in, weight, height_in, height, blood_glucose_in,
            blood_glucose, blood_pressure_in, blood_pressure, cholesterol_in, cholesterol, distance_in, distance, system_email, member_services_email, sms,
            phone_call, post } = req.body;

        const preference = await Preference.findOne({where: {userId: uuid}});

        if(preference){
            await preference.update({
                language, breakfast, lunch, dinner, wake_time, bed_time, weight_in, weight, height_in, height, blood_glucose_in,
                blood_glucose, blood_pressure_in, blood_pressure, cholesterol_in, cholesterol, distance_in, distance, system_email, member_services_email, sms,
                phone_call, post, userId: uuid
            })
        }
        else{
            await Preference.create({
                language, breakfast, lunch, dinner, wake_time, bed_time, weight_in, weight, height_in, height, blood_glucose_in,
                blood_glucose, blood_pressure_in, blood_pressure, cholesterol_in, cholesterol, distance_in, distance, system_email, member_services_email, sms,
                phone_call, post, userId: uuid
            })
        }
        res.status(200).json({"message":"Preference updated Successfully"});
    }
    catch(err){
        res.status(500).json({'message': 'Something went wrong'})
    }
}

// post request
export const updateUserPassword = async(req:any, res:Response) => {
    try{
        const uuid = req.user;
        const {prevPass, newPass} = req.body;
        const user:any = await User.findByPk(uuid);
        const isMatched = await bcrypt.compare(prevPass, user.password);
        if(isMatched){
            const hashedPassword = await bcrypt.hash(newPass, 10);
            await user.update({password: hashedPassword});
            res.status(200).json({"message":"Password updated Successfully"});
        } else {
            res.status(401).json({"message":"Current Password isn't matched"});
        }
    }
    catch(err)
    {
        res.status(500).json({"message":"Something went wrong"});
    }
}

// post request
export const inviteFriend = async(req:any, res:Response) => {
    try{
        const uuid = req.user;
        const {friends} = req.body;
        const user:any = await User.findByPk(uuid);
        await friends.map(async(friend:any)=>{
        
            let existedUser = await User.findOne({where:{ email:friend.email }});
            if(existedUser){
                let request = await Request.create({
                    sent_by: uuid,
                    sent_to: existedUser.uuid,
                })
                var template:string = loginTemplate(user.firstname, user.lastname, existedUser.email);
            } else {
                let request = await Request.create({
                    sent_by: uuid,
                    sent_to_mail: friend.email,
                });
                var template:string = signupTemplate(user.firstname, user.lastname, friend.email, friend.firstname, friend.lastname, user.uuid);
            }
            sendInvitation(friend.email, template);
        });
        res.status(200).json({"message":"Invitation sent SUccessfully"});
    }
    catch(err){
        res.status(500).json({"message":"Something went wrong"});
    }
}

// get request
export const getUserPreference = async(req:any, res:Response) => {
    try{
        const uuid = req.user;
        const preference = await Preference.findOne({where: {userId: uuid}});
        if(preference){
            res.status(200).json(preference);
        } else {
            res.status(200).json({"message":"No preference found"});
        }
    }
    catch(err){
        res.status(500).json({"message":"Something went wrong"});
    }
}