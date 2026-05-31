import validator from 'validator';

interface ValidationInput {
    firstName: string;
    lastName: string;
    emailId: string;
    password: string;
}

export const validateSignupUser = (data:ValidationInput): void =>{
    const {firstName, lastName, emailId, password} = data;

    if(!firstName || !lastName){
        throw new Error("Please enter both your first Name and Last Name");
    }

    else if(!emailId || !validator.isEmail(emailId)){
        throw new Error("Please enter a valid emial address");
    }

    else if(!password ||!validator.isStrongPassword(password)){
        throw new Error('Password is not Strong');
    }

}