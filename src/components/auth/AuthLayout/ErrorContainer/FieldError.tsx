import Image from 'next/image'
import React from 'react'
import errorImg from "@public/error.png"

const FieldError: React.FC<{message: string}> = ({message}) => {
  return (
    <p className='flex gap-1 items-center'>
      <Image src={errorImg} alt="" height={14} width={14} />
      <span className='text-12 text-red font-bold'>{message}</span>
    </p>
  )
}

export default FieldError