import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";
import { NextResponse } from "next/server";

interface ChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({
  userId,
  chapterId,
  courseId,
}: ChapterProps) => {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        }
      }
    });

    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
        title:true,
      }
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      }
    });

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }


    let video = null;
    let youtubeVideo = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    if (purchase) {
      
    }
    attachments = await db.attachment.findMany({
      where: {
        courseId: courseId,
      },
    });

    if (chapter.isFree || purchase) {
      //    if(chapter.videoUrl){
      //     video = chapter.videoUrl
      //    }
      //    else{
      //     return NextResponse.json("Video is not available")
      //    }

      video = chapter?.videoUrl;
      youtubeVideo = chapter?.youtubeUrl;

      nextChapter = await db.chapter.findFirst({
        where: { 
          courseId,
           isPublished: true ,
           position:{
              gt:chapter.position
           }
          
          },
          orderBy: {
              position: "asc"
          }
      });
    }

   

    const userProgress = await db.userProgress.findUnique({
        where: {
          userId_chapterId: {
            userId,
            chapterId,
          }
        }
      });

      return {
        chapter,
        course,
     
        attachments,
        nextChapter,
        userProgress,
        purchase,
      };


  } catch (err) {

    console.log("lesson", err);
    return {
      chapter: null,
      course: null,
      video: null,
      youtubeVideo:null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
  }}
}
