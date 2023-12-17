import React from 'react'
import logo from "@/public/images/logo-no-background.png"
import Image from "next/image"
const Logo = () => {
  return (
<div className="flex items-center  box-border" >
       <Image src={logo} alt="logo" height={120} width={120} className=" p-2 cursor-pointer rounded-full transform  hover:scale-125  ease-in-out duration-300"/>
        {/* <h2 className="font-bold tetransition-transform duration-300 ease-in-outxt-md text-indigo-600 ">Motion School</h2> */}
       </div>
  )
}

export default Logo