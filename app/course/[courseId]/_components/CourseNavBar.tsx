import { Chapter, Course, UserProgress } from "@prisma/client";
import { MobileSidebar } from "./MobileSidebar";

import Navbar from "@/app/motion-school/_components/Navbar";
import { cn } from "@/lib/utils";
import NavBarRoutes from "@/components/NavBarRoutes";
import CourseMobileView from "./CourseMobileView";

import Link from "next/link";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progress: number;
}

export const CourseNavBar = ({ course, progress }: CourseNavbarProps) => {
  return (
    <div
      className={cn(
        "transform hover:shadow-indigo-700  transition-transform duration-300 ease-in-out shadow-lg cursor-pointer  text-white w-full p-3 bg-indigo-600 flex items-center justify-between "
      )}
    >
      <MobileSidebar course={course} progress={progress} />
      <div>
        <Link href="/motion-school/search">
          {" "}
          <h3 className="font-semibold">{course.title}</h3>{" "}
        </Link>
      </div>

      <CourseMobileView />
    </div>
  );
};
