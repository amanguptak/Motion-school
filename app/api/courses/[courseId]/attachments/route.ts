import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export const POST = async(req: Request , { params }: { params: { courseId: string } })=>{

    try{
        const {userId}=auth()
        const {url} = await req.json()
        if(!userId){
            return new NextResponse("Unauthorized",{status: 401})
        }
        const courseOwner = await db.course.findMany({
            where:{
                id: params.courseId,
                userId: userId,
            }
        })
        if(!courseOwner){
            return new NextResponse("Unauthorized",{status: 401})
        }
        //here we are accessing  attachments table from schema not attachments key from course table
        const attachments = await db.attachment.create({
            data:{
                url,
                name: url.split("/").pop(),
                courseId: params.courseId,
        
            }
        })
        return  NextResponse.json(attachments)

    }catch(err){
        console.log("attachments error",err);
        return new NextResponse("Internal Server Error",{status:500})
    }

}