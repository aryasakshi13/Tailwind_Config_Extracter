import {Schema, model, Document} from 'mongoose';
import { timeStamp } from 'node:console';

export interface IUser extends Document {
     name: string;
     email: string;
     password: string;
     createdAt: Date ;
}

const UserSchema = new Schema<IUser>({
     name: {
        type: String,
        required: [true, 'Name is required']
     },
     email: {
        type: String, 
        required: [true, "Email is required" ],
        unique: true,
        lowercase: true,
        trim:true
     },
     password: {
        type: String,
        required:[true, "Password is required"]
     },
   
},{timestamps:true});

export const User = model<IUser>('User', UserSchema);