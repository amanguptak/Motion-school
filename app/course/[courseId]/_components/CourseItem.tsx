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
    <div>CourseItem</div>
  )
}

export default CourseItem