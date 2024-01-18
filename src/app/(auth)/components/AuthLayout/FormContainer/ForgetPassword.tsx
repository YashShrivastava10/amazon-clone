"use client"

import { checkUser, sendEmail } from '@/actions/auth'
import React, { useState } from 'react'
import { ErrorType } from './SignInForm';
import { domain, path } from '@/utils/api';

type Detail = {
  heading: string,
  desc: string,
  label: string,
  method: (formData: FormData) => void,
  name: string,
}

type Details = Record<string, Detail>;

const ForgetPassword = () => {

  const [email, setEmail] = useState<string>("")
  const [show, setShow] = useState<string>("email")
  const [error, setError] = useState<ErrorType>({ status: false, type: 1, message: "" })

  const handleEmail = async(formData: FormData) => {
    const email = formData.get("email") as string
    const emailField = document.querySelector<HTMLInputElement>("#email")
    if(email && email.trim() !== ""){
      setEmail(email)
      const status = await checkUser(email)
      if(status) {
        const response = await sendEmail(email) as {id?: string, error: any}
        if(response?.id){
          emailField!.value = ""
          setShow("otp")
        }
      }
      else console.log("Invalid Email")
    }
  }

  const handleOTP = (formData: FormData) => {

  }

  const details: Details = {
    "email": {
      heading: "Passsword assistance",
      desc: "Enter the email address or mobile phone number associated with your Amazon account.",
      label: "Enter your email or phone number",
      method: handleEmail,
      name: "email",
    },
    "otp": {
      heading: "Verification required",
      desc: `To continue, complete this verification step. We've sent a One Time Password (OTP) to the email ${email}. Please enter it below.`,
      label: "Enter OTP",
      method: handleOTP,
      name: "otp",
    }
  }

  return (
    <form action={details[show]["method"]} className='border border-silver rounded-lg flex flex-col justify-start items-start gap-2 py-4 px-5 w-full'>
      <div>
        <span className='text-3xl'>{details[show]["heading"]}</span>
      </div>
      <div>
        <p className='text-13'>{details[show]["desc"]}</p>
      </div>
      <div className='labelInput'>
        <label htmlFor={details[show]["name"]}>{details[show]["label"]}</label>
        <input id={details[show]["name"]} type={details[show]["name"]} name={details[show]["name"]} className={`${(error.status && error.type === 1) ? 'error' : 'inputField'}`} autoFocus />
      </div>
      <div className='w-full'>
        <button type="submit" className='authBtn'>Continue</button>
      </div>
    </form>
  )
}

export default ForgetPassword