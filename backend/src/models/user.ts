import {Schema, model, Document, Model} from 'mongoose';


import jwt from 'jsonwebtoken';

export interface IUser extends Document {
     firstName: string;
     lastName: string;
     email: String;
     password: string;
     createdAt: Date ;
}

 interface IUserMethods {
  getjwt(): string;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
     firstName: {
        type: String,
        required: [true, 'firstName is required'],
        maxLength: 50,
     },
     lastName :{
        type: String,
      //   required: [false, 'lastName is required'],
        required: false,
        maxLength: 50,
     },
     email: {
        type: String, 
        required: [true, "Email is required" ],
        unique: true,
        lowercase: true,
        trim:true,
     },
     password: {
        type: String,
        required:[true, "Password is required"],
        minLength: 8,
     },
   
},{timestamps:true});
 UserSchema.methods.getjwt =  function (this: IUser):string{
    const user = this;
    const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET is completely missing from your .env configurations!');
  }
     const token =  jwt.sign({id:user._id},secret,{expiresIn:'2h'});
     return token;
 };


export const User = model<IUser, UserModel>('User', UserSchema);