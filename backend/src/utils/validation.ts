import validator from 'validator';

interface ValidationInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
interface LoginInput {
    email : string;
    password: string;

}

export const validateSignupUser = (data:ValidationInput): void =>{
    const {firstName, lastName, email, password} = data;

    if(!firstName ){
        throw new Error("Please enter both your first Name ");
    }

    else if(!email || !validator.isEmail(email)){
        throw new Error("Please enter a valid emial address");
    }

    else if(!password ||!validator.isStrongPassword(password)){
        throw new Error('Password is not Strong');
    }

}

export const validateLoginUser = (data:LoginInput): void =>{
    const {email, password} = data ;

    if(!email || !password){
        throw new Error("Please enter both your email and pasword")
    }
    if(!validator.isEmail(email)){
        throw new Error("please provide a valid email id ")
    }
    
}