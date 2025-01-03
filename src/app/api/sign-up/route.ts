import UserModel from "@/model/User";
import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import { sendVerificationCode } from "@/helper/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();

    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return new Response(
        JSON.stringify({ success: false, message: "Username already exists" }),
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return new Response(
          JSON.stringify({ success: false, message: "User already exists!" }),
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date(Date.now() + 3600000);
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        message: [],
      });
      await newUser.save();
    }

    const emailResponse = await sendVerificationCode(email, username, verifyCode);
    if (!emailResponse) {
      return new Response(
        JSON.stringify({ success: false, message: "Error while sending email" }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "User registered, please check your mail" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while sending the response:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Error while registering user" }),
      { status: 500 }
    );
  }
}
