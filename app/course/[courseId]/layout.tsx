
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import CourseSidebar from './_components/CourseSidebar'
import Navbar from '@/app/motion-school/_components/Navbar'
import { getProgress } from '@/actions/getProgress'
import {CourseNavBar} from './_components/CourseNavBar'

interface CourseLayoutProps{
    children: React.ReactNode
    params:{
        courseId : string
    }
}

const CourseLayout = async({children , params}:CourseLayoutProps) => {

    const {userId} = auth()
    if(!userId) return redirect("/")

    const course = await db.course.findUnique({
        where:{
            id: params.courseId
        },include:{

            chapters:{
                where: {
                    isPublished: true,
                },include:{
                    userProgress: {
                        where: {
                            userId 
                        }
                    }
                },
                orderBy: {
                    position: "asc"
                }
            }
        }
    })

    if(!course) {return redirect("/")}

    const userProgressCount = await getProgress(userId, course.id);

  return (
    <main className="h-screen  flex">
      <div className=" hidden  lg:block md:flex  sticky  flex-col inset-y-0">
       <CourseSidebar
       course={course}
       progress={userProgressCount}
       />
      </div>

      <div className=" w-screen scrollbar-thin scrollbar-rounded scrollbar-thumb-amber-200 scroll md:overflow-y-scroll ">
        <CourseNavBar  course={course}
       progress={userProgressCount}/>
        <div>
        {children}
        </div>
      
      </div>
    </main>
  )
}

export default CourseLayout