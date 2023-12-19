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
  
  
    const remainingPublishedChapter = await db.chapter.findMany({
        where: {
            id:params.courseId,
            isPublished: true,
        }
    })
    
    if(!remainingPublishedChapter.length){

        await db.course.update({
            where: {
                id:params.courseId,
                
            },
            data: {
                isPublished: false
            }
        })
    }

    
   const unPublishedChapter = await db.chapter.update({
        where: {
          id: params.chapterId,
          courseId: params.courseId,
        },
        data: {
          isPublished: false,
        }
      });
      return NextResponse.json(unPublishedChapter);

    }catch(err){
        console.log(err);
        return new NextResponse("Internal Server Error",{status : 500})
    }
}