import Image from 'next/image'
import React from 'react'
import danger from "@public/danger.png"

const Error: React.FC<{message: string}> = ({message}) => {
  return (
    <div className='flex gap-4 h-[100px] w-[360px] border border-red p-4 rounded-lg outline outline-[3px] outline-[#ffe3e3] -outline-offset-4'>
      <div className='flex justify-center items-start'>
        <Image src={danger} alt="" height={35} width={35} />
      </div>
      <div className='flex flex-col item-start justify-start gap-2'>
        <span className="text-red text-17 font-bold">There was a problem</span>
        <span className='text-13'>{message}</span>
      </div>
    </div>
  )
}

export default Error