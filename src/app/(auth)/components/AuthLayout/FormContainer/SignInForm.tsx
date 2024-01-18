"use client";

import { checkUser, signin } from '@/actions/auth';
import { setUser } from '@/store/slice/userSlice';
import { redirect } from 'next/navigation';
import React, { FormEvent, ReactElement, useState } from 'react'
import { useDispatch } from 'react-redux';
import FieldError from '../FieldError';
import Error from '../ErrorContainer/Error';

export type ErrorType = {
  status: boolean,
  type: number,
  message: string,
}

const SignInForm = ({children}: {children : ReactElement}) => {

  const dispatch = useDispatch()

  const [show, setShow] = useState<string>("email")
  const [email, setEmail] = useState<string | undefined>("")
  const [error, setError] = useState<ErrorType>({status: false, type: 1, message: ""})

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const emailField = document.querySelector<HTMLInputElement>("#email")
    const email = emailField?.value
    if (email && email.trim() !== "") {
      setEmail(email)
      const status = await checkUser(email)
      if (status) {
        setShow("password")
      }
      else{
        setError({status: true, type: 2, message: "We cannot find an account with that email address"})
      }
    }
    else {
      emailField?.focus()
      setError({status: true, type: 1, message: "Enter your email or mobile phone number"})
    }
  }

  const handleInput = () => {
    if(error.status && error.type === 1){
      const emailField = document.querySelector<HTMLInputElement>("#email")?.value
      if(emailField){
        setError({status: false, type: 1, message: ""})
      }
    }    
  }

  if (show === "email") {
    return (
      <div className='flex flex-col gap-4'>

        {(error.status && error.type === 2) && <Error message={error.message} />}

        <form onSubmit={handleSubmit} className='border border-silver rounded-lg flex flex-col justify-start items-start gap-4 py-4 px-5 w-full'>
          <div>
            <span className='text-3xl'>Sign in</span>
          </div>
          <div className='labelInput'>
            <label htmlFor='email'>Email or mobile phone number</label>
            <input id="email" type="text" name="email" onInput={handleInput} className={`${(error.status && error.type === 1) ? 'error' : 'inputField'}`} autoFocus />
            {(error.status && error.type === 1) && <FieldError message={error.message} />}
          </div>
          <div className='w-full'>
            <button type="submit" className='w-full bg-yellow rounded-md h-[30px] text-13 shadow-md hover:bg-[#F7CA00]'>Continue</button>
          </div>
          <div>
            <p className='text-12 w-full'>By continuing, you agree to Amazon&apos;s <a>Conditions of Use</a> and <a>Privacy Notice</a>.</p>
          </div>
          <div>
            <a className='text-13'>Forget Paswword</a>
          </div>
        </form>
        {show === "email" && children }
      </div>
    )
  }

  else {
    return (
      <form action={async formData => {
        const password = formData.get("password")
        const response = await signin(password as string, email as string)
        if (response.success) {
          dispatch(setUser(response.data))
          redirect("/")
        }
        else console.log(response.message)
      }} className='border border-silver rounded-lg flex flex-col justify-start items-start gap-4 py-4 px-5 w-full'>
        <div>
          <span className='text-3xl'>Sign in</span>
        </div>
        <div>
          <p className='flex gap-1 text-13'>
            <span>{email}</span>
            <a onClick={() => {setShow("email"); setEmail("")}}>Change</a>
          </p>
        </div>
        <div className='labelInput'>
          <div className='w-full flex justify-between'>
            <label htmlFor='password'>Password</label>
            <a className='text-13'>Forget your paswword?</a>
          </div>
          <input id="password" type="password" name="password" autoFocus />
        </div>
        <div className='w-full'>
          <button type="submit" className='w-full bg-yellow rounded-md h-[30px] text-13 shadow-md hover:bg-[#F7CA00]'>Sign in</button>
        </div>
      </form>
    )
  }
}

export default SignInForm