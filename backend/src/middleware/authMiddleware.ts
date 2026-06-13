import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthenticationRequest extends Request {
    user?: any ;
}

export const userAuthGuard = async (req: AuthenticationRequest, res: Response, next: NextFunction):Promise<void> =>{
  console.log("👉 GUARD IS RUNNING! Incoming Cookies:", req.cookies);
   try{
   
      const authHeader = req.headers.authorization;
     let token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
     
     if(!token){
         token = req.cookies?.token;
      }
      

      if(!token){
        console.log("guard block no token found in headers or cookies");
        res.status(401).json({success: false, message: 'Authentication required. Please login'})
        return;

      }

      const secret = process.env.JWT_SECRET;
      
      if (!secret) {
      res.status(500).json({ success: false, message: 'Internal Server Configuration Error.' });
      return;
    }

     const decode = jwt.verify(token, secret) as JwtPayload;

      const user = await User.findById(decode.id).select('-password');
      if(!user){
        res.status(401).json({ success: false, message: 'User profile not found.' });
         return;
      }
       req.user = user;
      next();
    }catch(err:any){
     console.log("Auth middleware:", err.message);
    res.status(401).send("Unauthorized access");
    return ;
   }
}


// export const userAuthGuard = async (req: AuthenticationRequest, res: Response, next: NextFunction):Promise<void> =>{
//   console.log("👉 GUARD IS RUNNING! Incoming Cookies:", req.cookies);
//    try{
//       const token = req.cookies?.token;

//       if(!token){
//         res.status(401).json({success: false, message: 'Authentication required. Please login'})
//         return;

//       }

//       const secret = process.env.JWT_SECRET;
//       
//       if (!secret) {
//       res.status(500).json({ success: false, message: 'Internal Server Configuration Error.' });
//       return;
//     }

//       const decode = jwt.verify(token, secret) as JwtPayload;

//       const user = await User.findById(decode.id).select('-password');
//       if(!user){
//         res.status(401).json({ success: false, message: 'User profile not found.' });
//          return;
//       }
//        req.user = user;
//       next();
//     }catch(err:any){
//      console.log("Auth middleware:", err.message);
//     res.status(401).send("Unauthorized access");
//    }

// }
