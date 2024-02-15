"use client"

import React, { ReactElement, useState } from 'react'
import { ErrorType } from '../SignInForm/SignInForm';
import { redirect } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slice/userSlice';
import FieldError from '../../ErrorContainer/FieldError';
import Error from '../../ErrorContainer/Error';
import { changePassword, checkUser } from '@/actions/auth/auth';
import { sendEmail } from '@/actions/auth/email';

type Detail = {
  heading: string,
  desc: string,
  label: string,
  method: (formData: FormData) => void,
  name: string,
  type: string,
  btn: string
}

type Details = Record<string, Detail>;

const ForgetPassword = ({children} : { children: ReactElement }) => {

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
        if (response?.data) {
          emailField!.value = ""
          setShow("otp")
          setOTP(response.otp)
          setError({ status: false, type: 1, message: "" })
        }
      }
      else setError({ status: true, message: "We're sorry. We weren't able to identify you given the information provided.", type: 2 })
    }
    else setError({ status: true, message: "Enter your email or mobile phone number", type: 1 })
  }

  const handleOTP = (formData: FormData) => {
    const inputOTP = formData.get("otp") as string
    const otpField = document.querySelector<HTMLInputElement>("#otp")
    if (+inputOTP === otp) {
      otpField!.value = ""
      setShow("reset")
      setError({ status: false, type: 1, message: "" })
    }
    else {
      setError({ status: true, message: "Invalid OTP. Please check your code and try again.", type: 3 })
    }
  }

  const handleReset = async (formData: FormData) => {
    const password = formData.get("password") as string
    const rePassword = formData.get("rePassword")
    const validatePassword = (password: string) => password.trim() === "" || password.length < 6
    if (validatePassword(password)) {
      document.getElementById("password")?.focus()
      setError({ status: true, type: 4, message: "Passwords must be at least 6 characters." })
      return
    }
    if (password === rePassword) {
      const response = await changePassword(email, password)
      if (response.success) {
        setError({ status: false, type: 1, message: "" })
        dispatch(setUser(response.data))
        redirect("/")
      }
    }
    else {
      document.getElementById("rePassword")?.focus()
      setError({ status: true, type: 5, message: "Passwords must match" })
    }
  }

  const details: Details = {
    "email": {
      heading: "Passsword assistance",
      desc: "Enter the email address or mobile phone number associated with your Amazon account.",
      label: "Enter your email or phone number",
      method: handleEmail,
      name: "email",
      type: "text",
      btn: "Continue",
    },
    "otp": {
      heading: "Verification required",
      desc: `To continue, complete this verification step. We've sent a One Time Password (OTP) to the email ${email}. Please enter it below.`,
      label: "Enter OTP",
      method: handleOTP,
      name: "otp",
      type: "text",
      btn: "Continue",
    },
    "reset": {
      heading: "Create new password",
      desc: "We'll ask for this password whenever you Sign-In.",
      label: "New Password",
      method: handleReset,
      name: "password",
      type: "password",
      btn: "Save changes and Sign-In",
    }
  }

  return (
    <div className="flex flex-col gap-2">

      {(error.status && error.type === 2) && <Error message={error.message} />}

      <form action={details[show]["method"]} className='border border-silver rounded-lg flex flex-col justify-start items-start gap-4 py-4 px-5 w-full'>

        <div className='flex flex-col gap-1'>
          <span className='text-3xl'>{details[show]["heading"]}</span>
          <p className='text-13'>{details[show]["desc"]}</p>
        </div>
              
        <div className='labelInput'>
          <label htmlFor={details[show]["name"]}>{details[show]["label"]}</label>
          <input id={details[show]["name"]} type={details[show]["type"]} name={details[show]["name"]} className={`${(error.status) ? 'error' : 'inputField'}`} autoFocus />

          {(error.status && (error.type === 1 || error.type === 3 || error.type === 4)) && <FieldError message={error.message} />}
        </div>
        
        {show === "reset" &&
          <div className='labelInput'>
            <label htmlFor="rePassword">Re-enter password</label>
            <input id="rePassword" type="password" name="rePassword" className={`${(error.status && error.type === 5) ? 'error' : 'inputField'}`} />
            {(error.status && error.type === 5) && <FieldError message={error.message} />}
          </div>
        }

        <div className='w-full'>
          <button type="submit" className='authBtn'>{details[show]["btn"]}</button>
        </div>
        
        {show === "otp" &&
          <div className='w-full flex justify-center mt-4'>
            <a className='text-13' onClick={async () => {
              const response = await sendEmail(email) as { id?: string, error: any }
            }}>Resend OTP</a>  
          </div>
        }
      </form>

      {show === "reset" && children}
    </div>
  )
}

export default ForgetPassword