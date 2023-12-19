import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export const PATCH = async(req:Request, {params}:{params:{courseId:string , chapterId:string}})=>{
    try{
       const  {userId} = auth()
       if(!userId) return new NextResponse("Unauthorized",{status: 401})

       const courseOwner = await db.course.findUnique({
        where: {
            id : params.courseId,
            userId: userId
       
        }
       })

       if(!courseOwner) return new NextResponse("Unauthorized",{status: 401})
       const chapter = await db.chapter.findUnique({
        where: {
          id: params.chapterId,
          courseId: params.courseId,
        }
      });
  
  
      if (!chapter || !chapter.title || !chapter.description) {
        return new NextResponse("Missing required fields", { status: 400 });
      }
  
      const publishedChapter = await db.chapter.update({
        where: {
          id: params.chapterId,
          courseId: params.courseId,
        },
        data: {
          isPublished: true,
        }
      });
  
      return NextResponse.json(publishedChapter);

    }catch(err){
        console.log(err);
        return new NextResponse("Internal Server Error",{status : 500})
    }
}