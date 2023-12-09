import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export const PATCH = async(req:Request , {params}:{params:{courseId : string}})=>{

    try{
       const  {userId} = auth()
       const {courseId} = params
        if(!userId){
            return new NextResponse("Unauthorized",{status: 401})
        }
        const values = await req.json()
        const course = await db.course.update({
            where: {
                id:courseId,
                userId:userId
            },
            data:{...values}
        })
        return  NextResponse.json(course)

    }catch(err){
        console.log("courseId api",err);
        return new NextResponse("Internal Server Error",{status:500})
    }

}