import Image from 'next/image'
import React from 'react'
import amazonLogo from "../../../../../public/amazon-logo.jpg"
import Link from 'next/link';

const ImageContainer = () => {
  return (
    <div className='h-[10%] w-full flex justify-center items-center'>
      <Link href="/" className='h-[40px] w-[103px] relative'>
        <Image src={amazonLogo} alt="Amazon" fill />
      </Link>
    </div>
  )
}
export default ImageContainer