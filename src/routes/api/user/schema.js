import * as yup from 'yup';


export const signupRequestSchema = yup.object().shape({
    name: yup.string().required(),
    gender: yup.string().required(),
    password: yup.string().min(4).required(),
    username: yup.string().min(3).required()

});

export const signinRequestSchema = yup.object().shape({
    password: yup.string().required(),
    username: yup.string().required()

});