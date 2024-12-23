import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt: Date
}

const MessageScehma : Schema<Message> = new Schema({
        content: {
            type: String,
            required: true
        },

        createdAt : {
            type: Date,
            required: true,
            default : Date.now
        }
})


export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verfiyCodeExpiry : Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    message: Message[];
}

const UserSchema : Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid email address"], 
    },
    password: {
        type: String,
        required: [true, "passowrd is required"],
        
    },

    verifyCode: {
        type: String,
        required: [true, "verfiy code is required"],
        
    },

    verfiyCodeExpiry: {
        type: Date,
        required: [true, "verfiy code expriy is required"],
        
    },

    isVerified: {
        type: Boolean,
        default : false
        
    },

    isAcceptingMessage: {
        type: Boolean,
        default: true
    },

    message: [MessageScehma]

})


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel