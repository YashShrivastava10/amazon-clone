"use client";

import React, { FormEvent, useEffect, useState } from 'react'

const SignInForm = () => {

  useEffect(() => {
    const email = document.getElementById("email")
    email?.focus()
  }, [])

  const handleContinue = (e: FormEvent) => {
    e.preventDefault()
    const { email } = Object.fromEntries(new FormData(e.target as HTMLFormElement))
    if(email){}
    else{}
  }

  return (
    <form onSubmit={handleContinue} className='border border-silver rounded-lg flex flex-col justify-start items-start gap-4 py-4 px-5 w-full'>
      <div>
        <span className='text-3xl'>Sign in</span>
      </div>
      <div className='labelInput'>
        <label htmlFor='email'>Email or mobile phone number</label>
        <input id="email" type="text" name="email"/>
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

export default SignInForm