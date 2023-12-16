import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { CustomIcon } from "@/components/custom-icon";
import LessonInfo from "./_components/lessonInfo";
import LessonAccess from "./_components/lessonaccess";
import LessonVideo from "./_components/lessonvideo";

interface LessonProps {
  params: {
    courseId: string;
    lessonId: string;
  };
}

const Lesson = async ({ params }: LessonProps) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/motion-school");
  }

  const lesson = await db.chapter.findUnique({
    where: {
      id: params.lessonId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!lesson) {
    redirect("/motion-school");
  }
  const requiredFields = [lesson.title, lesson.description, lesson.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const progressText = `(${completedFields}/${totalFields})`;

  const isCompleted = requiredFields.every(Boolean);
  return (
    <div className="h-fit space-y-2  lg:scrollbar-track-indigo-500 p-7 m-6  mt-4 lg:mx-auto shadow-lg items-center justify-center max-w-4xl  bg-indigo-400  rounded-md bg-clip-padding backdrop-filter lg:backdrop-blur-sm bg-opacity-20 border border-gray-100">
      <div>
        <Link
          className="flex items-center space-x-2 cursor-pointer"
          href={`/motion-school/teacher/courses/${params.courseId}`}
        >
          <ArrowLeft
            size={20}
            className="text-indigo-500 font-medium hover:text-indigo-700"
          />
          <span className="text-sm text-slate-800 font-medium">
            {" "}
            Back to Course
          </span>
        </Link>
      </div>

      <div className="flex flex-col gap-y-1">
        <h1 className="text-2xl font-semibold text-slate-800">Lesson SetUp</h1>
        <span className="text-sm text-slate-600">
          Please Complete all steps {progressText}{" "}
        </span>
      </div>

      <div className="grid md:grid-cols-12 mt-6 space-y-4 md:space-y-0  lg:gap-8">

        <div className="lg:col-span-6 col-span-12">
        <LessonInfo
          initialData={lesson}
          courseId={params.courseId}
          lessonId={params.lessonId}
        />

        <LessonAccess
         initialData={lesson}
         courseId={params.courseId}
         lessonId={params.lessonId}
        />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <LessonVideo
            initialData={lesson}
            courseId={params.courseId}
            lessonId={params.lessonId}
          />
       </div>
      </div>

     
    </div>
  );
};

export default Lesson;
