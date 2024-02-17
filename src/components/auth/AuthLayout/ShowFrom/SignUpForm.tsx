"use client";

import { setUser } from '@/store/slice/userSlice';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { ErrorType } from './SignInForm/SignInForm';
import Image from 'next/image';
import info from "@public/info.png"
import FieldError from '../ErrorContainer/FieldError';
import { checkUser, signup } from '@/actions/auth/auth';
import { SignUpFormDataType } from '@/types/Form';

type Field = {
  value: string;
  validator: (value: string) => boolean;
  errorMessage: string;
  type: number;
};

type Fields = Record<string, Field>;

const SignUpForm = () => {

  const dispatch = useDispatch()

  const [error, setError] = useState<ErrorType>({ status: false, type: 1, message: "" })

  const validateName = (name: string) => name.trim() === ""
  const validateEmail = (email: string) => email.trim() === ""
  const validatePassword = (password: string) => password.trim() === "" || password.length < 6
  const validateRePassword = (password: string) => password.trim() === ""

  const handelSubmit = async(formData: FormData) => {
    const { name, email, password, rePassword } = Object.fromEntries(formData.entries()) as SignUpFormDataType

    const fields: Fields = {
      "#name": { value: name, validator: validateName, errorMessage: "Enter your name", type: 1 },
      "#email": { value: email, validator: validateEmail, errorMessage: "Enter your email or mobile phone number", type: 2 },
      "#password": { value: password, validator: validatePassword, errorMessage: "Minimum 6 characters required", type: 3 },
      "#rePassword": { value: rePassword, validator: validateRePassword, errorMessage: "Type your password again", type: 4 }
    }

    for (const [key, { value, validator, errorMessage, type }] of Object.entries(fields)) {
      if (validator(value)) {
        setError({ status: true, message: errorMessage, type })
        document.getElementById(`${key}`)?.focus()
        return
      }
    }
    if (await checkUser(email)) {
      setError({ status: true, message: "There's already an account with this email.", type: 5 })
      document.getElementById("#emai")?.focus()
      return
    }
    if (password !== rePassword) {
      setError({ status: true, message: "Passwords must match", type: 6 })
      document.getElementById("#rePassword")?.focus()
      return
    }
    const response = await signup(formData)
    if (response.success) {
      dispatch(setUser(response.data))
      redirect("/")
    }
    else {
      setError({ status: true, type: 7, message: response.message })
    }
  }

  return (
    <form action={handelSubmit} className='border border-silver rounded-lg flex flex-col justify-start items-start gap-4 px-5 py-4 w-full'>
      <div>
        <span className='text-3xl'>Create account</span>
      </div>

      <div className='labelInput'>
        <label htmlFor='name'>Your Name</label>
        <input id="name" name="name" className={`${(error.status && error.type === 1) ? 'error' : 'inputField'}`} placeholder="First and last name" autoFocus />
        {(error.status && error.type === 1) && <FieldError message={error.message} />}
      </div>

      <div className='labelInput'>
        <label htmlFor='email'>Mobile number or email</label>
        <input id="email" name="email" className={`${(error.status && (error.type === 2 || error.type === 5)) ? 'error' : 'inputField'}`} />
        {(error.status && (error.type === 2 || error.type === 5)) && <FieldError message={error.message} />}
      </div>

      <div className='labelInput'>
        <label htmlFor='password'>Password</label>
        <input id="password" name="password" type="password" className={`${(error.status && (error.type === 3 || error.type === 6)) ? 'error' : 'inputField'}`} placeholder="At least 6 characters" />
        {(error.status && error.type === 3) ? <FieldError message={error.message} /> : <div className='flex items-center gap-1'>
          <Image src={info} alt="" height={15} width={15} />
          <span className='text-12'>Passwords must be at least 6 characters.</span>
        </div>}
      </div>

      <div className='labelInput'>
        <label htmlFor='rePassword'>Re-enter Password</label>
        <input id="rePassword" name="rePassword" type="password" className={`${(error.status && (error.type === 4 || error.type === 6)) ? 'error' : 'inputField'}`} />
        {(error.status && (error.type === 4 || error.type === 6)) && <FieldError message={error.message} />}
      </div>

      <div className='w-full'>
        <button type="submit" className='authBtn'>Continue</button>
      </div>

      <div>
        <p className='text-12 w-full'>By continuing, you agree to Amazon&apos;s <a>Conditions of Use</a> and <a>Privacy Notice</a>.</p>
      </div>
      
      <div>
        <span className='text-13'>Already have an account? <Link href="/signin">Sign in</Link></span>
      </div>
    </form>
  )
}

export default SignUpForm