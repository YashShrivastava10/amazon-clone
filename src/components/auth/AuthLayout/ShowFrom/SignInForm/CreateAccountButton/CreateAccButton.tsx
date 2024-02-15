"use server"

import Link from 'next/link'
import React from 'react'

const CreateAccButton = () => {
  return (
    <Link href={"/signup"} className='w-full text-black hover:text-black'>
      <button className='w-full text-13 py-1 shadow-lg bg-white border border-silver rounded-lg hover:bg-lightBlue'>
        Create your Amazon account
      </button>
    </Link>)
}

export default CreateAccButton