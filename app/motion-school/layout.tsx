import React, { ReactNode, useState } from "react";
import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="h-screen grid grid-cols-12 ">
      <div className="lg:col-span-2  hidden  lg:block md:flex  sticky  md:col-span-3 flex-col inset-y-0">
        <Sidebar />
      </div>

      <div className="lg:col-span-10 col-span-12 md:col-span-9 scrollbar-thin scrollbar-rounded scrollbar-thumb-amber-200 scroll md:overflow-y-scroll ">
        <Navbar />
        {children}
      </div>
    </main>
  );
};

export default layout;
