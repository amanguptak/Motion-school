import React from 'react'
import { SignIn } from "@clerk/nextjs";
const SignIN = () => {
  return (
   
   
       <div className=" bg-[#f1f1f1] flex flex-col h-screen items-center justify-center">
      {/* <Image src={img} alt="logo" height={200} width={200}/> */}
   
   
   
           <SignIn appearance= {{variables:{colorPrimary:"#4f46e5"}}} />
       </div>
   
  )
}

export default SignIN