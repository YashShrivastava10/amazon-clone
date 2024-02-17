"use client";

import Image from 'next/image'
import React from 'react'
import amazon from "@public/amazon.png"
import { MapPin, Search, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

const Header = () => {

  const showBorder = (id: string) => {
    if(id === "all"){
      const elem1: HTMLDivElement | null = document.querySelector('#dropdown')
      const elem2: HTMLDivElement | null = document.querySelector('#search')
      const elem3: HTMLDivElement | null = document.querySelector('#icon')
      if(!elem1 || !elem2 || !elem3) return
      elem1.style.border = "3px solid #febd69"
      elem1.style.borderRight = "none"
      elem3.style.border = "3px solid #febd69"
      elem3.style.borderLeft = "none"
      elem2.style.borderTop = "3px solid #febd69"
      elem2.style.borderBottom = "3px solid #febd69"
      return
    }
    const elem: HTMLDivElement | null = document.querySelector(`#${id}`)
    if(!elem) return
    elem.style.border = "3px solid #febd69"
  }

  return (
    <div className='w-full h-[60px] 
    bg-[#131921] text-white py-1
    flex items-center gap-3 pr-2 pl-2'>

      <Link href="/" className='navbar-section items-center'>
        <div className='h-[35px] w-[115px] relative'>
          <Image src={amazon} alt="" fill />
        </div>
      </Link>

      <div className='navbar-section flex-col'>
        <div className='ml-6 text-12 text-[#ccc]'>
          <span>Deliver to</span>
        </div>
        <div className='flex gap-1 -mt-1'>
          <span><MapPin size={20} /></span>
          <b className='text-14'>India</b>
        </div>
      </div>

      <div className='h-full flex flex-grow items-center'>
        <div className='h-[75%] flex flex-grow items-center border-2 border-transparent' id="all" onClick={() => showBorder("all")}>
        <div className='h-full 
        flex items-center gap-x-2
        bg-[#e6e6e6] hover:bg-[#d4d4d4]
        px-3 border-3 border-transparent
        text-11 text-[#555] hover:text-black
        rounded-l-md cursor-pointer' id="dropdown" onClick={() => showBorder("dropdown")}>
          <span>All</span>
          <span className="arrow"></span>
        </div>
        <div className='h-full flex items-center w-full border-3 border-transparent' id="search">
          <input type='search' placeholder="Search Amazon.in" className='h-full w-full'/>
        </div>
        <div className='h-full 
          flex items-center gap-x-2
          bg-[#febd69] hover:bg-[#f3a847]
          px-3 text-black border-3 border-transparent
          rounded-r-md cursor-pointer' id="icon" onClick={() => showBorder("icon")}>
          <span><Search size={20}/></span>
        </div>
        </div>
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
          <ShoppingCart size={28} />
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