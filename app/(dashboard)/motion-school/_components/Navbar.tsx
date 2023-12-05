import React from 'react'
import { UserButton } from '@clerk/nextjs'
const Navbar = () => {
  return (
    <div className=' transform hover:shadow-indigo-700 transition-transform duration-300 ease-in-out shadow-lg cursor-pointer rounded-b-lg text-white w-full p-5 bg-indigo-600 flex items-center justify-between'>
        <div>content</div>
        <UserButton afterSignOutUrl='/'/>
    </div>
  )
}

export default Navbar