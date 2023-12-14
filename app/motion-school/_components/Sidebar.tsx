import React from "react";
import Logo from "./Logo";
import { SidebarRoutes } from "./SideBarRoutes";
import BeautyCard from "./BeautyCard";


const Sidebar = () => {
  return (
    <div className=" h-screen p-3 lg:block hover:shadow-indigo-700 cursor-pointer shadow-2xl">
      <Logo />

      <div className="flex flex-col items-center h-[600px] justify-between ">
        <SidebarRoutes />
        <BeautyCard/>
       
      </div>
    </div>
  );
};

export default Sidebar;
