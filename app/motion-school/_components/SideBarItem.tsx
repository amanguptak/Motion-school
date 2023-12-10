"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Link } from "lucide-react";
interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
};

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === href)

  const onClick = () => {
    router.push(href);
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-indigo-600",
        isActive && "rounded-lg text-indigo-600 bg-indigo-200/20 hover:bg-indigo-400/20 hover:text-indigo-800"
      )}
    >
      <div className="flex w-fit h-full items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "",
            isActive && "text-indigo-600"
          )}
        />
        {label}
      </div>
      
    </button>
 
  )
}