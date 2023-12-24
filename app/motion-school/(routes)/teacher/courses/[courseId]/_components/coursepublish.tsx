"use client"

import React, { useState } from 'react'

import axios from "axios"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ConfirmModal } from '@/components/Confirmodal'
import { Trash } from 'lucide-react'

interface CoursePublishProps{
    stepComplete: boolean;
    courseId: string;
 
    isPublished: boolean;
}

const CoursePublish = ({stepComplete , courseId, isPublished}:CoursePublishProps) => {
  
const router = useRouter()
const [loading , setLoading] = useState(false)

const onPublish = async()=>{
    try{
        setLoading(true)
        if(isPublished) {
            await axios.patch(`/api/courses/${courseId}/unpublish`,)
           
            toast.info("Course Unpublished")
            router.refresh()
        }else{
            await axios.patch(`/api/courses/${courseId}/publish`,)
            toast.success("Course Published Successfully")
            router.refresh()
            router.push("/motion-school/teacher/courses")
        }

    }catch(err){
        toast.error("Something went wrong")
    }finally{
        setLoading(false);
    }
}

  const onDelete = async()=>{
    try{
        setLoading(true)

    
            await axios.delete(`/api/courses/${courseId}`)
            toast.info("Course deleted successfully")
            router.refresh()
            router.push(`/motion-school/teacher/courses`)

    }catch(err){
            // console.log(""err)
            toast.error("Something went wrong")
    }finally{
        setLoading(false)
    }
  }
  
    return (
        <div className="flex items-center space-x-2">
        <Button size="sm" disabled={!stepComplete || loading} onClick={onPublish}> {isPublished ? "Hide" : "Publish"} </Button>
        <ConfirmModal deleteThing="lesson" onConfirm={onDelete}>
            {/* <Button asChild variant="ghost" disabled={loading}>
          
            </Button> */}
            <Trash
            size={20}
            className="text-red-500 cursor-pointer hover:text-red-600"

          
          />
       
        </ConfirmModal>
      </div>
  )
}

export default CoursePublish