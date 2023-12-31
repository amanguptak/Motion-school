import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import { CustomIcon } from "@/components/custom-icon";
import { BookAIcon } from "lucide-react";
import CourseItem from "./CourseItem";
import CourseProgress from '@/components/CourseProgress';

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progress: number;
}

const CourseSidebar = async ({ course, progress }: CourseSidebarProps) => {
  const { userId } = auth();
  {
    if (!userId) return redirect("/");
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId: userId,
        courseId: course.id,
      },
    },
  });

  return (
    <div className="w-52 shadow-md h-full">
       <div className=" p-5 border shadow-sm text-center flex flex-col ">
        <span className="flex  items-center text-center">
          {" "}
          <CustomIcon icon={BookAIcon} size="sm" />{" "}
          <h1 className="font-semibold text-lg ml-2 lg:text-sm text-slate-600">
          Lessons
          </h1>
        </span>
        <div>
          {purchase && (
            <div className="mt-4">
              <CourseProgress
              variant="success"
              value={progress}
              />
            </div>
          )}
        </div>
      </div> 

      <div>
        {course.chapters.map((chapter) => (
          <CourseItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
