import React from 'react'
import { SignUp } from "@clerk/nextjs";
const Signup = () => {
  return (
   
   
       <div className=" bg-[#f1f1f1] flex flex-col h-screen items-center justify-center">
      {/* <Image src={img} alt="logo" height={200} width={200}/> */}
   
   
   
           <SignUp appearance= {{variables:{colorPrimary:"#6366f1"}}} />
       </div>
   
  )
}

export default Signup