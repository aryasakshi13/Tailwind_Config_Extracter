import validator from 'validator';

interface ValidationInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const validateSignupUser = (data:ValidationInput): void =>{
    const {firstName, lastName, email, password} = data;

    if(!firstName || !lastName){
        throw new Error("Please enter both your first Name and Last Name");
    }

    else if(!email || !validator.isEmail(email)){
        throw new Error("Please enter a valid emial address");
    }

    else if(!password ||!validator.isStrongPassword(password)){
        throw new Error('Password is not Strong');
    }

}