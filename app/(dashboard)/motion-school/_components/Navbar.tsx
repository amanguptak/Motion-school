"use client"
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'

import { MobileSidebar } from './MobileSidebar'
const Navbar = () => {
  const [open , setOpen] = useState(false)
  return (
    <div className={cn('transform hover:shadow-indigo-700 transition-transform duration-300 ease-in-out shadow-lg cursor-pointer rounded-b-lg text-white w-full p-5 bg-indigo-600 flex items-center justify-between')}>
        <div className='flex items-center justify-center'> 
        
        <MobileSidebar/>
          content
        
          
          </div>
        <UserButton afterSignOutUrl='/'/>
    </div>
  )
}

export default Navbar