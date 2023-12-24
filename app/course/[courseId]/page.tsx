import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'


const Course = async({params}:{params:{courseId : string}}) => {

  // const {userId} = auth()
  

const course = await db.course.findUnique({
  where: {
    id: params.courseId,

  },include:{
    chapters:{
      where: {
        isPublished: true,
      },orderBy: {
        position:"asc"
      }
    }
  }
})
 if (!course){
   return redirect('/')
  } 

  return (
    <div>Course</div>
  )
}

export default Course