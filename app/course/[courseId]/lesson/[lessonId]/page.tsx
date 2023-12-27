import { getChapter } from "@/actions/getChapters";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import LessonVideo from "./_components/LessonVideo";
import { Button } from "@/components/ui/button";
import { priceFormatter } from "../../../../../lib/price-formatter";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CourseAttachments from "./_components/CourseAttachments";

interface lessonProps {
  params: {
    courseId: string;
    lessonId: string;
  };
}

const Lesson = async ({ params }: lessonProps) => {
  const { userId } = auth();
  if (!userId) {
    return console.log("no user");
  }
  const {
    chapter,
    course,

    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    courseId: params.courseId,
    chapterId: params.lessonId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }
  const isLocked = !chapter.isFree && !purchase;

  return (
    <div>
      {userProgress?.isCompleted && <>Chapter complete put banner</>}

      {isLocked && "Purchace banner"}

      <div>
        <div className="p-4">
          <LessonVideo
            lessonId={params.lessonId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id!}
            lesson={chapter}
            isLocked={isLocked}
          />
        </div>

        <div className="text-center mx-5 lg:flex mb-4 lg:mb-3 lg:item-center lg: justify-between space-2">
          <h3 className="text-slate-700 font-semibold text-xl">
            {chapter.title}
          </h3>

          {isLocked ? (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-full lg:w-fit mt-2 lg:mt-0 bg-indigo-600 hover-bg-indigo-700 text-white text-sm p-2 rounded-lg">
                    Buy {priceFormatter(course.price!)}
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>Unlock All Chapters Of This Course</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          ) : (
            <span className="text-green-600 font-semibold cursor-pointer hover:text-green-900">
              Free
            </span>
          )}
        </div>
        <Separator />
        <div>
          <CourseAttachments attachments={attachments}/>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
