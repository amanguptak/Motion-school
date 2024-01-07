import React, { ReactNode, useState } from "react";
import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";
const layout = ({ children }: { children: ReactNode }) => {

  // grid grid-cols-12 md:col-span-3 lg:col-span-2 lg:col-span-10 col-span-12 md:col-span-9 
  return (
    <main className="h-screen lg:overflow-hidden flex">
      <div className=" hidden  lg:block md:flex  sticky  flex-col inset-y-0">
        <Sidebar />
      </div>

      <div className=" w-screen scrollbar-thin scrollbar-rounded scrollbar-thumb-amber-200 scroll md:overflow-y-scroll ">
        <Navbar />
        <div className="scrollbar-thin scrollbar-rounded scrollbar-thumb-amber-200 scroll overflow-y-scroll ">
        {children}
        </div>
      
      </div>
    </main>
  );
};

export default layout;
