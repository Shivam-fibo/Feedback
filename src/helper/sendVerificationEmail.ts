import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";
import VerificationEmail from "../../email/VerificationEmail";

export async function sendVerificationCode (username: string, email: string, verfiyCode: string) : Promise<ApiResponse>{
    try {
        resend.emails.send({
            to: 'onboarding@resend.dev',
            from: email,
            subject: "Verification Code",
            react: VerificationEmail({username, otp: verfiyCode})
        })
        return{success: true, message: "Verification code send successfully"}

    } catch (error) {
        console.error("Error while sending the otp")
        return{success: false, message: "Error while sending the verification code"}
    }
}