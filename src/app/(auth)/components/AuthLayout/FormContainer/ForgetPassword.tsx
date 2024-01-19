"use client"

import { checkUser, sendEmail, changePassword } from '@/actions/auth'
import React, { useState } from 'react'
import { ErrorType } from './SignInForm';
import { domain, path } from '@/utils/api';
import { redirect } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slice/userSlice';

type Detail = {
  heading: string,
  desc: string,
  label: string,
  method: (formData: FormData) => void,
  name: string,
  btn: string
}

type Details = Record<string, Detail>;

const ForgetPassword = () => {

  const dispatch = useDispatch()

  const [email, setEmail] = useState<string>("")
  const [show, setShow] = useState<string>("email")
  const [error, setError] = useState<ErrorType>({ status: false, type: 1, message: "" })
  const [otp, setOTP] = useState<number | null>(null)

  const handleEmail = async (formData: FormData) => {
    const email = formData.get("email") as string
    const emailField = document.querySelector<HTMLInputElement>("#email")
    if (email && email.trim() !== "") {
      setEmail(email)
      const status = await checkUser(email)
      if (status) {
        const response = await sendEmail(email) as { data: object, error: any, otp: number }
        console.log(response);
        if (response?.data) {
          emailField!.value = ""
          setShow("otp")
          setOTP(response.otp)
        }
      }
      else console.log("Invalid Email")
    }
  }

  const handleOTP = (formData: FormData) => {
    const inputOTP = formData.get("otp") as string
    const otpField = document.querySelector<HTMLInputElement>("#otp")
    console.log(inputOTP, otp);
    if (+inputOTP === otp) {
      otpField!.value = ""
      setShow("reset")
    }
  }

  const handleReset = async (formData: FormData) => {
    const password = formData.get("password") as string
    const rePassword = formData.get("rePassword")
    console.log(password, rePassword);
    if (password === rePassword) {
      const response = await changePassword(email, password)
      if(response.success){
        dispatch(setUser(response.data))
        redirect("/")
      }
    }
    else console.log("Incorrect Password")
  }

  const details: Details = {
    "email": {
      heading: "Passsword assistance",
      desc: "Enter the email address or mobile phone number associated with your Amazon account.",
      label: "Enter your email or phone number",
      method: handleEmail,
      name: "email",
      btn: "Continue",
    },
    "otp": {
      heading: "Verification required",
      desc: `To continue, complete this verification step. We've sent a One Time Password (OTP) to the email ${email}. Please enter it below.`,
      label: "Enter OTP",
      method: handleOTP,
      name: "otp",
      btn: "Continue",
    },
    "reset": {
      heading: "Create new password",
      desc: "We'll ask for this password whenever you Sign-In.",
      label: "New Password",
      method: handleReset,
      name: "password",
      btn: "Save changes and Sign-In",
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
      {show === "reset" &&
        <div className='labelInput'>
          <label htmlFor="rePassword">Re-enter password</label>
          <input id="rePassword" type="rePassword" name="rePassword" className={`${(error.status && error.type === 1) ? 'error' : 'inputField'}`} autoFocus />
        </div>
      }

      <div className='w-full'>
        <button type="submit" className='authBtn'>{details[show]["btn"]}</button>
      </div>
      {show === "otp" && <div className='w-full flex justify-center mt-4'>
        <a className='text-13' onClick={async () => {
          const response = await sendEmail(email) as { id?: string, error: any }
        }}>Resend OTP</a>
      </div>
      }
    </form>
  )
}

export default ForgetPassword