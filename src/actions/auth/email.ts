"use server"

import { EmailTemplate } from "@/emailTemplate/EmailTemplate";
import { Resend } from "resend";

export const sendEmail = async(email: string) => {

  const resend = new Resend(process.env.RESEND_API_KEY);
  try{
    const otp = generateOTP()
    const {data, error} = await resend.emails.send({
      from: 'Amazon-Clone.com <onboarding@resend.dev>',
      to: email,
      subject: 'Amazon password assistance',
      react: EmailTemplate({ otp }) as React.ReactElement,
    });
    if(data) return {data, otp}
    return {data, error, otp}
  }
  catch(error){
    return error
  }
}

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000)
}