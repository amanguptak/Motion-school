"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Link } from "lucide-react";
interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  sidebarExpand?: boolean;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
  sidebarExpand,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname === href;

  const onClick = () => {
    router.push(href);
  };
  // cursor-pointer
  // transition-colors
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex relative  group items-center gap-x-2 text-slate-500 text-sm font-[500] transition-all hover:text-indigo-600",
        isActive &&
          "rounded-lg text-indigo-600 bg-indigo-200/20 hover:bg-indigo-400/20 hover:text-indigo-800",
        sidebarExpand ? "pl-0 p-0 rounded-full" : "pl-6"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          className={cn(
            "h-6 w-6",
            isActive && "text-indigo-600",
            sidebarExpand && "h-8 w-8 ml-2"
          )}
        />

        <span
          className={cn(
            `overflow-hidden transition-all duration-300 ease-linear`,
            sidebarExpand ? "hidden" : "block"
          )}
        >
          {label}
        </span>

        {sidebarExpand && (
          <div
            className="
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-amber-200 text-indigo-500 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      "
          >
            {label}
          </div>
        )}
      </div>
    </button>
  );
};
