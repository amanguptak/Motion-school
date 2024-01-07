"use client";
import React, { useState } from "react";
import Logo from "./Logo";
import { SidebarRoutes } from "./SideBarRoutes";
import BeautyCard from "./BeautyCard";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [expand, setExpand] = useState(true);
  // localStorage.setItem('Expand', expand.toString());
  return (
    <div
      className={cn(
        " p-2 lg:block hover:shadow-indigo-700 cursor-pointer shadow-2xl relative duration-300 ease-linear",
        expand ? "w-16" : "w-52"
      )}
    >
      <button
        className="absolute cursor-pointer -right-3 top-16 rounded-full border-2 w-7 border-indigo-500"
        onClick={() => setExpand((current) => !current)}
      >
        {expand ? (
          <ChevronLast className="text-amber-400" />
        ) : (
          <ChevronFirst className="text-amber-400" />
        )}
      </button>
      <Logo expand={expand} />

      <div className="flex flex-col items-center h-[640px]  justify-between ">
        <SidebarRoutes SidebarExpand={expand} />
        {expand ?  <></>   : <BeautyCard/> }
      </div>
    </div>
  );
};

export default Sidebar;
