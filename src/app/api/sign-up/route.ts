import UserModel from "@/model/User";
import { dbConnect } from "@/lib/dbConnect";
import bcryptjs from 'bcryptjs'
import { sendVerificationCode } from "@/helper/sendVerificationEmail";


export async function POST(request: Request){
        await dbConnect();
    try {
        
    } catch (error) {
            console.error("Error while sending the respose")
            return Response.json({success: false, error: "Error while registering user"}, {status: 500})
    }
}