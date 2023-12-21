import React from "react";
import logo from "@/public/images/logo-no-background.png";

interface LogoProps {
  expand?: boolean;
}

import Image from "next/image";
import { cn } from "@/lib/utils";
const Logo = ({ expand }: LogoProps) => {
  return (
    <div className={cn(" box-border text-center", !expand && "ml-4")}>
      <Image
        src={logo}
        alt="logo"
        height={140}
        width={140}
        className=" p-2 cursor-pointer mb-5 transform  hover:scale-125  ease-in-out duration-300"
      />
    </div>
  );
};

export default Logo;
