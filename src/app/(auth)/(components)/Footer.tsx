import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className='flex flex-col min-h-[100px] w-full justify-center items-center relative'>
      <hr className='w-full h-[1px] absolute inset-0'/>
      <div className='w-[360px] flex flex-col justify-center items-center h-full gap-2'>
        <div className='w-3/4 flex justify-evenly text-11'>
          <a>Condition of Use</a>
          <a>Privacy Notice</a>
          <a>Help</a>
        </div>
        <div>
          <span className='text-11'>
            &copy; 2024-{currentYear}, Amazon-clone.com, Inc. or its affiliates
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer