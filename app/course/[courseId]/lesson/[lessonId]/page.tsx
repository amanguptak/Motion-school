import { getChapter } from "@/actions/getChapters";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import LessonVideo from "./_components/LessonVideo";
import { Button } from "@/components/ui/button";
import { priceFormatter } from "../../../../../lib/price-formatter";
import { Separator } from "@/components/ui/separator";

import CourseAttachments from "./_components/CourseAttachments";
import BuyButton from "./_components/BuyButton";
import { db } from "@/lib/db";
import CompleteLesson from "./_components/CompleteLesson";

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
            <BuyButton
              isLocked={isLocked}
              coursePrice={course.price!}
              courseId={params.courseId}
            />
          ) : (
            <CompleteLesson 
            courseId={params.courseId}
            lessonId={params.lessonId}
            isCompleted={!!userProgress?.isCompleted}
            nextChapterId={nextChapter?.id}
            />
          )}
        </div>
        <Separator />
        <div>
          <CourseAttachments attachments={attachments} />
        </div>
      </div>
    </div>
  );
};

export default Lesson;
