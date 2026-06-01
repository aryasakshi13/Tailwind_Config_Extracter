import {Request, Response} from 'express';
import {User} from '../models/user';
import { validateSignupUser } from '../utils/validation';
import bcrypt from 'bcryptjs';



export const registerUser = async(req: Request, res: Response): Promise<void> =>{
    try{
         validateSignupUser(req.body);
        const{email, firstName,lastName, password} =  req.body;

        const hashpassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            email,
            password:hashpassword
        });
        await user.save();
        const token = user.getjwt();

        res.cookie('token', token,{
            maxAge: 2* 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite:'strict'
        })

        res.status(201).json({
            success: true,
            message:'User registered Successfully',
            data:{
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }
        });
        
    }catch(err: any){
        console.log('Error:', err.message);
       
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};