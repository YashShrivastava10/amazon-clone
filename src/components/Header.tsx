import Image from 'next/image'
import React from 'react'
import amazon from "../../public/amazon.png"
import { MapPin, Search, ShoppingCart } from 'lucide-react'

const Header = () => {
  return (
    <div className='w-full h-[60px] 
    bg-[#131921] text-white py-1
    flex items-center justify-around text-black'>
      
      <div className='navbar-section items-center'>
        <div className='h-[35px] w-[115px] relative'>
          <Image src={amazon} alt="" fill/>
        </div>
      </div>

      <div className='navbar-section flex-col'>
        <div className='ml-6 text-12 text-[#ccc]'>
          <span>Deliver to</span>
        </div>
        <div className='flex gap-1 -mt-1'>
          <span><MapPin size={20}/></span>
          <b className='text-14'>India</b>
        </div>
      </div>

      <div className='h-full w-[550px] flex items-center'>
        <select className='
        h-[75%] 
        flex items-center gap-x-2
        bg-[#e6e6e6] hover:bg-[#d4d4d4]
        px-2
        text-11 text-[#555] hover:text-black
        rounded-l-md'>
          <option>All</option>
        </select>
        <input type='search' placeholder="Search Amazon" className='h-[75%] w-full'/>
        <span className='
        h-[75%] 
        flex items-center gap-x-2
        bg-[#febd69] hover:bg-[#f3a847]
        px-3 text-black
        rounded-r-md'><Search size={20}/></span>
      </div>

      <div className='navbar-section'>
        <span>FL</span>
        <span>EN</span>
      </div>

      <div className='navbar-section flex-col gap-0'>
        <span className='text-12'>Hello, sign in</span>
        <b className='text-14 -mt-1'>Account & Lists</b>
      </div>

      <div className='navbar-section flex-col'>
        <span className='text-12'>Returns</span>
        <b className='text-14 -mt-1'>& Orders</b>
      </div>

      <div className='navbar-section items-center gap-1'>
        <div className='relative'>
          <ShoppingCart size={28}/>
          <span className='absolute bg-transparent -top-3 h-[20px] aspect-square right-[3px] flex justify-center items-center'>
            <b className='text-[#f08804]'>5</b>
          </span>
        </div>
        <b className='mt-4 text-14'>Cart</b>
      </div>
    </div>
  )
}

export default Header