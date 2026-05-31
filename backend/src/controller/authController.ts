import {Request, Response} from 'express';
import {User} from '../models/user';
import { validateSignupUser } from '../utils/validation';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

        
    }catch(err){

    }
}