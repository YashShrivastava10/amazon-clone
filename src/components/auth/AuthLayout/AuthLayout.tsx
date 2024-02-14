import React from 'react'
import ImageContainer from './ImageContainer'
import FormContainer from './FormContainer'


const AuthLayout = ({ status }: { status: string }) => {
  return (
    <div className='h-full w-full flex flex-col justify-start items-center gap-4'>
      <ImageContainer />
      <FormContainer status={status} />
    </div>
  )
}

export default AuthLayout