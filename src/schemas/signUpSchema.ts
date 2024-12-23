import {z} from 'zod'

export const validateusername  =  z

    .string()
    .min(2, "username must not be less thatn 2 character")
    .max(20, "username must not be more than 20 characters")


export const signUpSchema = z.object({
    username: validateusername,
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, "passoword must be greater than 6 characters")
})



