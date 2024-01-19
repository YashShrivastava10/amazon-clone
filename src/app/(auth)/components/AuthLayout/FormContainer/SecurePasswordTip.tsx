"use server";

import React from 'react'

const SecurePasswordTip = () => {
  return (
    <div className='w-full mt-4'>
      <span className='font-bold text-17'>Secure password tips:</span>
      <div className='px-4'>
        <ul className='list-disc text-13'>
          <li>Use at least 8 characters, a combination of numbers and letters is best.</li>
          <li>Do not use the same password you have used with us previously.</li>
          <li>Do not use dictionary words, your name, e-mail address, mobile phone number or other personal information that can be easily obtained.</li>
          <li>Do not use the same password for multiple online accounts.</li>
        </ul>
      </div>
    </div>
  )
}

export default SecurePasswordTip