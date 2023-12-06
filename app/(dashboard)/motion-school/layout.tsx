import React, { ReactNode, useState } from "react";
import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="h-screen  grid grid-cols-12 bg-[#f1f1f1]">
      <div className="lg:col-span-2 hidden  lg:local lg:block md:flex h-full  flex-col inset-y-0">
        <Sidebar />
      </div>

      <div className="lg:col-span-10 col-span-12">
        <Navbar />
        {children}
      </div>
    </main>
  );
};

export default layout;
