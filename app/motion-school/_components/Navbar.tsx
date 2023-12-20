"use client"
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'
import { MobileSidebar } from './MobileSidebar'
import NavBarRoutes from '@/components/NavBarRoutes'
const Navbar = () => {

 

  return (
    <div className={cn('transform hover:shadow-indigo-700  transition-transform duration-300 ease-in-out shadow-lg cursor-pointer rounded-b-lg text-white w-full p-4 bg-indigo-600 flex items-center justify-between ')}>
        <div className='flex items-center justify-center'> 
        
        <MobileSidebar/>
          content
        
          
          </div>
        
        <NavBarRoutes/>
      
    </div>
  )
}

export default Navbar