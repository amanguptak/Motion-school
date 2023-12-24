import { CustomIcon } from '@/components/custom-icon';
import { BookAIcon } from 'lucide-react';
import React from 'react'

interface CourseItemProps{
    label: string;
    id: string;
    isCompleted: boolean;
    courseId: string;
    isLocked: boolean;
}

const CourseItem = ({label,id,isCompleted,courseId,isLocked}:CourseItemProps) => {
  return (
 <div className=" p-5 shadow-lg text-center flex flex-col ">
        <span className="flex  items-center text-center">
          {" "}
          <CustomIcon icon={BookAIcon} size="sm" />{" "}
          <h1 className="font-semibold text-lg ml-2 lg:text-sm text-slate-600">
          Chapters
          </h1>
        </span>
      </div> 
  )
}

export default CourseItem