"use client";

import { checkUser, signin } from '@/actions/auth';
import { setUser } from '@/store/slice/userSlice';
import { redirect } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux';

const SignInForm = () => {

  const dispatch = useDispatch()

  const [show, setShow] = useState<string>("email")
  const [email, setEmail] = useState<string | undefined>("")

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault()
    const email = document.querySelector<HTMLInputElement>("#email")?.value
    if(email){
      if(email.trim() !== ""){
        setEmail(email)
        const status = await checkUser(email)
        if(status){
          setShow("password")
        }
      }
    }
  }

  if(show === "email"){
    return (
      <form onSubmit={handleSubmit} className='border border-silver rounded-lg flex flex-col justify-start items-start gap-4 py-4 px-5 w-full'>
        <div>
          <span className='text-3xl'>Sign in</span>
        </div>
        <div className='labelInput'>
          <label htmlFor='email'>Email or mobile phone number</label>
          <input id="email" type="text" name="email" autoFocus />
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
    )
  }
  else{
    return(
      <form action={async formData => {
        const password = formData.get("password")
        const response = await signin(password as string, email as string)
        if(response.success){
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
            <a onClick={() => setShow("email")}>Change</a>
          </p>
        </div>
        <div className='labelInput'>
          <div className='w-full flex justify-between'>
            <label htmlFor='password'>Password</label>
            <a className='text-13'>Forget your paswword?</a>
          </div>
          <input id="password" type="password" name="password" autoFocus/>
        </div>
        <div className='w-full'>
        <button type="submit" className='w-full bg-yellow rounded-md h-[30px] text-13 shadow-md hover:bg-[#F7CA00]'>Sign in</button>
      </div>
      </form>
    )
  }
}

export default SignInForm