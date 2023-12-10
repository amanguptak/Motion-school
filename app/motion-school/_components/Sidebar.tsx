import React from 'react'
import Logo from './Logo'
import { SidebarRoutes } from './SideBarRoutes'
const Sidebar = () => {
  return (
 

   <div className='w-full h-screen  lg:block hover:shadow-indigo-700 cursor-pointer shadow-2xl'>
     <div className='p-3 h-screen'>
 
          <Logo/>
    
      
        <div className="flex flex-col w-full mt-3">
        <SidebarRoutes/>
      </div>
        </div>
   </div>
 
   
  )
}

export default Sidebar