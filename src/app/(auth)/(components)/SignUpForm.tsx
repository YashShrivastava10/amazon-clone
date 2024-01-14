"use client";

import Link from 'next/link'
import React, { FormEvent, useEffect } from 'react'

const SignUpForm = () => {

  useEffect(() => {
    const name = document.getElementById("name")
    name?.focus()
  }, [])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement))
  }

  return (
    <form onSubmit={onSubmit} className='border border-silver rounded-lg flex flex-col justify-start items-start gap-4 px-5 py-4 w-full'>
      <div>
        <span className='text-3xl'>Create account</span>
      </div>
      <div className='labelInput'>
        <label htmlFor='name'>Your Name</label>
        <input id="name" name="name" placeholder="First and last name" required/>
      </div>
      <div className='labelInput'>
        <label htmlFor='email'>Mobile number or email</label>
        <input id="email" name="email" className='border border-[#a6a6a6] rounded h-[30px]' required/>
      </div>
      <div className='labelInput'>
        <label htmlFor='password'>Password</label>
        <input id="password" name="password" type="password" placeholder="At least 6 characters" className='border border-[#a6a6a6] rounded h-[30px]' required/>
      </div>
      <div className='labelInput'>
        <label htmlFor='rePassword'>Re-enter Password</label>
        <input id="rePassword" name="rePassword" type="password" className='border border-[#a6a6a6] rounded h-[30px]' required/>
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
  )
}

export default SignUpForm