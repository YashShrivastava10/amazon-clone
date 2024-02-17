"use client";

import { setUser } from '@/store/slice/userSlice';
import { redirect } from 'next/navigation';
import React, { FormEvent, ReactElement, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FieldError from '../../ErrorContainer/FieldError';
import Error from '../../ErrorContainer/Error';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { checkUser, signin } from '@/actions/auth/auth';

export type ErrorType = {
  status: boolean,
  type: number,
  message: string,
}

type Detail = {
  label: string,
  method: (formData: FormData) => void,
  type: string,
  name: string
}

type Details = Record<string, Detail>

const SignInForm = ({ children }: { children: ReactElement }) => {

  const dispatch = useDispatch()

  const [show, setShow] = useState<string>("email")
  const [email, setEmail] = useState<string | undefined>("")
  const [error, setError] = useState<ErrorType>({ status: false, type: 1, message: "" })

  const handleInput = () => {
    if (error.status && error.type === 1) {
      const emailField = document.querySelector<HTMLInputElement>("#email")?.value
      if (emailField) {
        setError({ status: false, type: 1, message: "" })
      }
    }
  }

  const Continue = () => {
    return (
      <div className='w-full'>
        <button type="submit" className='authBtn'>Continue</button>
      </div>
    )
  }

  const SignInButton = () => {
    const { pending } = useFormStatus()
    return (
      <div className='w-full'>
        <button type="submit" className='w-full bg-yellow rounded-md h-[30px] text-13 shadow-md hover:bg-[#F7CA00]'>Sign in</button>
      </div>
    )
  }

  const handleContinue = async (formData: FormData) => {
    const emailField = document.querySelector<HTMLInputElement>("#email")
    const email = formData.get("email") as string
    if (email && email.trim() !== "") {
      setEmail(email)
      const status = await checkUser(email)
      if (status) {
        if (emailField) emailField.value = ""
        setShow("password")
        setError({ status: false, type: 1, message: "" })
        document.querySelector<HTMLInputElement>("#password")?.focus()
      }
      else {
        setError({ status: true, type: 2, message: "We cannot find an account with that email address" })
      }
    }
    else {
      emailField?.focus()
      setError({ status: true, type: 1, message: "Enter your email or mobile phone number" })
    }
  }

  const handleSignIn = async (formData: FormData) => {
    const password = formData.get("password") as string
    const checked = formData.get("remember") === "on"
    if (password.trim() !== "") {
      const response = await signin(password, email!, checked)
      if (response.success) {
        console.log(response.data);
        dispatch(setUser({...response.data}))
        redirect("/")
      }
      else {
        setError({ status: true, message: response.message, type: 4 })
      }
    }
    else {
      setError({ status: true, message: "Enter your password", type: 3 })
    }
  }

  const details: Details = {
    email: {
      label: "Email or mobile phone number",
      method: handleContinue,
      type: "text",
      name: "email"
    },
    password: {
      label: "Password",
      method: handleSignIn,
      type: "password",
      name: "password"
    }
  }

  return (
    <div className='flex flex-col gap-4'>

      {(error.status && (error.type === 2 || error.type === 4)) && <Error message={error.message} />}

      <form action={details[show]["method"]} className='border border-silver rounded-lg flex flex-col justify-start items-start gap-4 py-4 px-5 w-full'>
        <div>
          <span className='text-3xl'>Sign in</span>
        </div>
        {show === "password" &&
          <div>
            <p className='flex gap-1 text-13'>
              <span>{email}</span>
              <a onClick={() => { setShow("email"); setEmail("") }}>Change</a>
            </p>
          </div>
        }
        <div className='labelInput'>
          <div className='w-full flex justify-between'>
            <label htmlFor='password'>{details[show]["label"]}</label>
            {show === "password" && <Link href="/forgetPassword" className='text-13'>Forget your paswword?</Link>}
          </div>
          <input id={details[show]["name"]} type={details[show]["type"]} name={details[show]["name"]} className={`${(error.status && (error.type === 1 || error.type === 3)) ? 'error' : 'inputField'}`} autoFocus />

          {(error.status && (error.type === 1 || error.type === 1)) && <FieldError message={error.message} />}
        </div>
        {show === "email" ? <Continue /> : <SignInButton />}
        {show === "password" && 
        <div className='flex gap-2 item-center justify-start'>
          <input type='checkbox' id="remember" name="remember"/>
          <label className="text-13" htmlFor='remember'>Keep me signed in.</label>
        </div>}
        {show === "email" &&
          <>
            <div>
              <p className='text-12 w-full'>By continuing, you agree to Amazon&apos;s <a>Conditions of Use</a> and <a>Privacy Notice</a>.</p>
            </div>
            <div>
              <Link href="/forgetPassword" className='text-13'>Forget your Paswword?</Link>
            </div>
          </>
        }
      </form>
      {show === "email" && children}
    </div>
  )
}

export default SignInForm