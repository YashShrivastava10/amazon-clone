"use server"

import { connectDB } from "@/db"
import { encrypt, verifyPassword } from "@/utils/hash"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { Resend } from "resend"
import { EmailTemplate } from "@/app/(auth)/components/AuthLayout/FormContainer/EmailTemplate"

type User = {
  name: string,
  email: string,
  password: string,
  createDate: Date,
  loggedIn: Date,
  loggedOut: null,
}

export type SignUpFormData = {
  name: string,
  email: string,
  password: string,
  rePassword: string
}

const connection = connectDB()

const createResponse = ({ success, message, data }: { success: boolean, message: string, data?: object }) => {
  const status = success ? 200 : 500
  return { success, message, data, status }
};

const fetchUser = async (email: string) => {
  const collection = (await connection).collection("user")
  return { user: await collection.findOne({ email }), collection }
}

const secretKey = process.env.JWT_SECRET_KEY

if(!secretKey) throw new Error("JWT Secret Key is not valid")

export const signup = async (formData: FormData) => {
  try {
    const form = Object.fromEntries(formData.entries()) as SignUpFormData;
    const { rePassword, ...userDetails } = form;

    const { name, email, password } = userDetails;

    // Fetch User from db
    const { user, collection } = await fetchUser(email);

    // Hash the password
    const hashedPassword = await encrypt(password);

    const userInfo: User = {
      name: name,
      email: email,
      password: hashedPassword,
      createDate: new Date(),
      loggedIn: new Date(),
      loggedOut: null
    };

    // If user exists, do not create a new user in db
    if (user) {
      return createResponse({ success: false, message: "Email Id already Exist", data: { status: "True" } });
    }

    // If the user does not exist, create a new user in db
    const result = await collection.insertOne({ ...userInfo });

    if (result.acknowledged) {
      const token = jwt.sign({ email }, secretKey, { expiresIn: '6h' });
      cookies().set("authToken", token);

      const { password, ...data } = userInfo;
      const serializedUserInfo = {
        ...data,
        createDate: userInfo.createDate.toISOString(),
        loggedIn: userInfo.loggedIn.toISOString(),
      };

      return createResponse({ success: true, message: "Created", data: serializedUserInfo });
    } else {
      return createResponse({ success: false, message: "Not Created", data: { message: "Hello" } });
    }
  } catch (error) {
    // Handle other errors if needed
    console.error("Error in signup:", error);
    return createResponse({ success: false, message: "Internal Server Error", data: {} });
  }
};

export const signin = async (password: string, email: string) => {

  try{
    // Fetch user
    const { user, collection } = await fetchUser(email)
  
    // If user do not exist
    if (!user)
      return createResponse({ success: false, message: "We cannot find an account with that email address", data: {} })
  
    // If user exist but password do no match
    else if (!await verifyPassword(password, user.password))
      return createResponse({ success: false, message: "Your password is incorrect", data: {} })
  
    // else generate a token, set that in cookie and return true along with data 
    else {
      const result = await collection.updateOne({ email }, { $set: { loggedIn: new Date() } })
      if (!result.acknowledged)
        return createResponse({ success: false, message: "Not Signed in", data: {} })
  
      const token = jwt.sign({ email }, secretKey, { expiresIn: '6h' })
      cookies().set("authToken", token)
  
      const {_id, password, ...data } = user
      const serializedUserInfo = {
        ...data,
        createDate: user.createDate.toISOString(),
        loggedIn: user.loggedIn.toISOString(),
      };
      return createResponse({ success: true, message: "Signed in", data: serializedUserInfo })
    }
  }
  catch (error) {
    // Handle other errors if needed
    console.error("Error in signin:", error);
    return createResponse({ success: false, message: "Internal Server Error", data: {} });
  }
}

export const checkUser = async (email: string) => {
  const { user, collection } = await fetchUser(email)
  if(user) return true
  return false
}

export const sendEmail = async(email: string) => {

  const resend = new Resend(process.env.RESEND_API_KEY);
  try{
    const {data, error} = await resend.emails.send({
      from: 'Amazon-Clone.com <onboarding@resend.dev>',
      to: email,
      subject: 'Amazon password assistance',
      react: EmailTemplate({ otp: generateOTP() }) as React.ReactElement,
    });
    if(data) return data
    return error
  }
  catch(error){
    return error
  }
}

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000)
}
