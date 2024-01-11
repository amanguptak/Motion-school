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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle, Computer } from "lucide-react";
import Glitter from "@/components/Glitter";
import { getProgress } from "@/actions/getProgress";
import { Badge } from "@/components/ui/badge";

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
  const isLocked = !purchase;
  const isFree = !chapter.isFree;
  const userProgressCount = await getProgress(userId, params.courseId);


  return (
    <div>
      { userProgressCount === 100 ? (
        <Alert className="bg-green-500">
          <div className="flex items-center space-x-2">
            <CheckCircle size={16} className="text-white" />

            <AlertDescription className="text-white">
              Congratulation 🥳 This course is completed .
            </AlertDescription>
            <Glitter isConfettiActive={userProgressCount === 100} />
          </div>
        </Alert>
      ): <></>}
       

      {isLocked && (
        <Alert>
          <div className="flex items-center space-x-2">
            <AlertTriangle size={16} className="text-blue-700" />

            <AlertDescription>
              This Course is not Purchased. It will not be visible in the
              Progress Section.
            </AlertDescription>
          </div>
        </Alert>
      )}

      <div>
        <div className="p-4">
          <LessonVideo
            lessonId={params.lessonId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id!}
            lesson={chapter}
            isLocked={isLocked}
            isFree={isFree}
          />
        </div>

        <div className="text-center mx-5 lg:flex mb-4 lg:mb-3 lg:item-center lg: justify-between space-2">
          <h3 className="text-slate-700 font-semibold text-xl">
            {chapter.title}
          </h3>

          {isLocked && isFree ? (
            <BuyButton
              isLocked={isLocked}
              coursePrice={course.price!}
              courseId={params.courseId}
            />
          ) : !isLocked ? (
            <>
              {" "}
              <CompleteLesson
                courseId={params.courseId}
                lessonId={params.lessonId}
                isCompleted={!!userProgress?.isCompleted}
                nextChapterId={nextChapter?.id}
              />
            </>
          ) : (
            <>
              <BuyButton
                isLocked={isLocked}
                coursePrice={course.price!}
                courseId={params.courseId}
              />
            </>
          )}
          
        </div>

    {!isLocked &&
         ( <div className="m-5 mb-2 mt-0">
        <span className="text-slate-800 text-sm font-bold"> Chapter Status :</span>  { userProgress?.isCompleted ? (
          <Badge variant="secondary">Completed</Badge>
         ): <Badge variant="destructive">Not completed</Badge>}
           </div>)
    }
      
        <Separator />
        <div>
          <CourseAttachments attachments={attachments} />
        </div>
      </div>
    </div>
  );
};

export default Lesson;
