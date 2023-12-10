"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./SideBarItem";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/motion-school",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/motion-school/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/motion-school/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/motion-school/teacher/analytics",
  },
]

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col  w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}