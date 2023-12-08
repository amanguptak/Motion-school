import React from 'react'

interface ParamsType{
  params:{
    courseId : string
  } 
}

const CourseId = ({params}:ParamsType) => {
  return (
    <div>CourseId:{params.courseId}</div>
  )
}

export default CourseId