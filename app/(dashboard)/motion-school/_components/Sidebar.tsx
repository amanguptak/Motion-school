import React from 'react'
import Logo from './Logo'
import { SidebarRoutes } from './SideBarRoutes'
const Sidebar = () => {
  return (
 

   <div className='w-full lg:block hover:shadow-indigo-700 cursor-pointer shadow-2xl'>
     <div className=' h-screen  p-3 '>
        <div>
          <Logo/>
        </div>
      
        <div className="flex flex-col w-full mt-3">
        <SidebarRoutes/>
      </div>
        </div>
   </div>
 
   
  )
}

export default Sidebar