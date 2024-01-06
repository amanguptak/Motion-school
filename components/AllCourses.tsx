import { Category, Course } from "@prisma/client";
import React from "react";
import { FcFinePrint } from "react-icons/fc";
import CourseCard from "./CourseCard";
interface CourseWithProgressCategory extends Course {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
}

interface AllCourseProps {
  items: CourseWithProgressCategory[];
}

const AllCourses = ({ items }: AllCourseProps) => {
  // console.log("all course",items);
  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 lg:gap-3 mt-3 space-x-2">
        {items.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            imageUrl={course.imageUrl!}
            description={course.description!}
            price={course.price!}
            id={course.id!}
            chaptersLength={course.chapters.length}
            category={course.category?.name}
            progress={course.progress}
          />
        ))}
      </div>
      {items.length === 0 && (
        <>
          <p className="flex items-center justify-center h-screen text-2xl text-slate-500 font-bold">
            No Course Available
            <FcFinePrint />
          </p>
        </>
      )}
    </>
  );
};

export default AllCourses;
