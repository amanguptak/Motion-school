"use client"

import { CustomIcon } from '@/components/custom-icon';
import { Chapter } from '@prisma/client'
import { VideoIcon } from 'lucide-react';
import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, ImageDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";
import {lessonVideoSchemaType} from "@/lib/validation/course"
import { Button } from "@/components/ui/button";
import { FileImageUpload } from "@/components/file-upload";

import React from 'react'

interface LessonVideoProps{

    initialData : Chapter;
    courseId: string;
    lessonId: string;
}
const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});
const LessonVideo = ({initialData,courseId,lessonId}:LessonVideoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const onSubmit = async (values: lessonVideoSchemaType) => {
    try {
      console.log("update", values);
      const res = await axios.patch(
        `/api/courses/${courseId}/chapters/${lessonId}`,
        values
      );
      // form.reset()
      toast.success("Video Added");
      toggleEdit();
      router.refresh();
      // router.push(`/motion-school/teacher/courses/${res?.data.id}`)
    } catch (err) {
      console.log(err);
      toast.error("something went wrong 😮");
    }
  };
  const router = useRouter();
  return (
    <div className="col-span-6 mt-4">
        <div className="gap-x-2 flex items-center justify-between mb-2">
       <div className='flex items-center space-x-2'>
       <CustomIcon size="md" icon={VideoIcon} />
          <h3 className="text-lg text-slate-800"> Lesson Video</h3>
       </div>
          <div>
          <Button onClick={toggleEdit}  variant="ghost">
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle size={15} className="mr-2"/>
              Add an video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil size={15} className="mx-2" />
              Edit video
            </>
          )}
        </Button>
          </div>
        </div>
      
   
      {!isEditing && (
        !initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-indigo-200 rounded-md">
            <VideoIcon className="h-10 w-10 text-indigo-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            {/* <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.videoUrl}
            /> */}
            video uploaded
          </div>
        )
      )}
      {isEditing && (
        <div>
          <FileImageUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4 text-center">
           Good quality video is recommended 😀

          </div>
        </div>
      )}
    
    </div>
  )
}

export default LessonVideo