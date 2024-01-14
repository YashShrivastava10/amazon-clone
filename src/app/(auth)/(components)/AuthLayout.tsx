import React from 'react'
import ImageContainer from './(AuthLayout)/ImageContainer'
import FormContainer from './(AuthLayout)/FormContainer'
import Link from 'next/link'

const NewToAmazon = () => {
  return (
    <div className='w-full relative h-[20px] flex items-center justify-center'>
      <hr className='absolute w-full' />
      <span className='bg-white z-20 px-2 text-grey text-xs'>New to amazon?</span>
    </div>
  )
}

const CreateAccButton = () => {
  return (
    <Link href={"/signup"} className='w-full text-black hover:text-black'>
      <button className='w-full text-13 py-1 shadow-lg bg-white border border-silver rounded-lg hover:bg-lightBlue'>
        Create your Amazon account
        </button>
    </Link>
  )
}

const AuthLayout = ({ status }: { status: string }) => {
  return (
    <div className='h-full w-full flex flex-col justify-start items-center gap-4'>
      <ImageContainer />
      <FormContainer status={status} />
      {status === "signin" && <NewToAmazon />}
      {status === "signin" && <CreateAccButton />}
    </div>
  )
}

export default AuthLayout