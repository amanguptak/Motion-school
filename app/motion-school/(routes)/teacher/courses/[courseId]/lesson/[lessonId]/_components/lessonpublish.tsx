"use client"

import React, { useState } from 'react'

import axios from "axios"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ConfirmModal } from '@/components/Confirmodal'
import { Trash } from 'lucide-react'

interface LessonPublishProps{
    setpComplete: boolean;
    courseId: string;
    lessonId: string;
    isPublished: boolean;
}

const LessonPublish = ({setpComplete , courseId , lessonId , isPublished}:LessonPublishProps) => {
  
const router = useRouter()
const [loading , setLoading] = useState(false)

const onPublish = async()=>{
    try{
setLoading(true)
        if(isPublished) {
            await axios.patch(`/api/courses/${courseId}/chapters/${lessonId}/unpublish`,)
           
            toast.info("Lesson Unpublished")
            router.refresh()
        }else{
            await axios.patch(`/api/courses/${courseId}/chapters/${lessonId}/publish`,)
            toast.success("Lesson Published Successfully")
            router.refresh()
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

    
            await axios.delete(`/api/courses/${courseId}/chapters/${lessonId}`)
            toast.info("Lesson deleted successfully")
            router.refresh()
            router.push(`/motion-school/teacher/courses/${courseId}`)

    }catch(err){
            // console.log(""err)
            toast.error("Something went wrong")
    }finally{
        setLoading(false)
    }
  }
  
    return (
        <div className="flex items-center space-x-2">
        <Button size="sm" disabled={!setpComplete || loading} onClick={onPublish}> {isPublished ? "Hide" : "Publish"} </Button>
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

export default LessonPublish