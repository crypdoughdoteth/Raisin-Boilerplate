import React from 'react'
import { BiDonateHeart } from 'react-icons/bi';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from 'next/link'
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-600 p-6 ">
              
    <div className="flex items-center flex-shrink-0 text-white mr-6 space-x-[10px]" >
    <Link className='flex space-x-[10px]' href="/">
      <BiDonateHeart size={35} />
      <span className="font-semibold text-xl tracking-tight ">Raisin</span>
    </Link>   
    </div>
    <div className="block lg:hidden">
    
    </div>
    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div className="text-sm lg:flex-grow">
        
        <Link className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" href="/startfund">Start fund</Link>
        <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          Examples
        </a>
        <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
          Blog
        </a>
      </div>
      <div>
      
        <a href="#" className="inline-block text-sm  leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"><ConnectButton accountStatus={{smallScreen: 'avatar',
      largeScreen: 'full'
    }}
      /></a>
      </div>
    </div>
  </nav>
  )
}
