import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export const POST = async(req:Request , {params}:{params:{courseId : string}})=>{

try{
    const {userId} = auth()
    const {title} = await req.json()
    if(!userId){
        return new NextResponse("Unauthorized",{status: 401})
    }
    const courseOwner = await db.course.findUnique({
        where: {
            id:params.courseId,
            userId:userId
        }
    })
    if (!courseOwner) {
        return new NextResponse("Unauthorized Owner", { status: 401 });
      }

const lastAddedChapter =  await db.chapter.findFirst({
    where: {
        courseId:params.courseId
    },
    orderBy:{
        position:"desc",
    }
})

const newChapterPosition = lastAddedChapter ? lastAddedChapter.position + 1 : 1;

const chapter = await db.chapter.create({
    data: {
        title,
        courseId:params.courseId,
        position:newChapterPosition
    }
})
return NextResponse.json(chapter);

}catch(err){
    console.error("chapters",err)
    return new NextResponse("Internal Server Error",{status:500})
}  

}