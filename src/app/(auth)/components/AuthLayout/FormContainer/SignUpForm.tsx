"use client";

import { signup } from '@/actions/auth'
import { setUser } from '@/store/slice/userSlice';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { ErrorType } from './SignInForm';
import Error from '../ErrorContainer/Error';
import Image from 'next/image';
import info from "../../../../public/info.png"

const SignUpForm = () => {

  const dispatch = useDispatch()

  const [error, setError] = useState<ErrorType>({ status: false, type: 1, message: "" })

  return (
    <div className='flex flex-col gap-4'>

      {(error.status && error.type === 2) && <Error message={error.message} />}

      <form action={async formData => {
        const password = formData.get("password")
        const rePassword = formData.get("rePassword")
        if (password === rePassword) {
          const response = await signup(formData)
          if (response.success) {
            dispatch(setUser(response.data))
            redirect("/")
          }
          else {
            setError({ status: true, type: 2, message: response.message })
          }
        }
        else {
          console.log("Password do not match");
        }
      }} className='border border-silver rounded-lg flex flex-col justify-start items-start gap-4 px-5 py-4 w-full'>
        <div>
          <span className='text-3xl'>Create account</span>
        </div>
        <div className='labelInput'>
          <label htmlFor='name'>Your Name</label>
          <input id="name" name="name" className={`${(error.status && error.type === 1) ? 'error' : 'inputField'}`} placeholder="First and last name" required autoFocus />
        </div>
        <div className='labelInput'>
          <label htmlFor='email'>Mobile number or email</label>
          <input id="email" name="email" className={`${(error.status && error.type === 1) ? 'error' : 'inputField'}`} required />
        </div>
        <div className='labelInput'>
          <label htmlFor='password'>Password</label>
          <input id="password" name="password" type="password" className={`${(error.status && error.type === 1) ? 'error' : 'inputField'}`} placeholder="At least 6 characters" required />
          <div className='flex items-center gap-1'>
            <Image src={info} alt="" height={15} width={15} />
            <span className='text-12'>Passwords must be at least 6 characters.</span>
          </div>
        </div>
        <div className='labelInput'>
          <label htmlFor='rePassword'>Re-enter Password</label>
          <input id="rePassword" name="rePassword" type="password" className={`${(error.status && error.type === 1) ? 'error' : 'inputField'}`} required />
        </div>
        <div className='w-full'>
          <button type="submit" className='w-full bg-yellow rounded-md h-[30px] text-13 shadow-md hover:bg-[#F7CA00]'>Continue</button>
        </div>
        <div>
          <p className='text-12 w-full'>By continuing, you agree to Amazon&apos;s <a>Conditions of Use</a> and <a>Privacy Notice</a>.</p>
        </div>
        <div>
          <span className='text-13'>Already have an account? <Link href="/signin">Sign in</Link></span>
        </div>
      </form>
    </div>

  )
}

export default SignUpForm