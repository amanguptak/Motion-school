import React from 'react'
import { Progress } from './ui/progress'
import { cn } from '@/lib/utils';

interface CourseProgressProps{
    value: number;
    variant?: "default" | "success";
    size?:"default"|"sm"
}

const colorByVariant = {
    default: "text-amber-400",
    success: "text-indigo-500"
}
const sizeByVariant = {
    default: "text-sm",
    sm:"text-xs"
}

const CourseProgress = ({value,variant,size}:CourseProgressProps) => {
  return (
    <div>

        <Progress
        className='h-2'
        value={value}
        variant={variant}
        />
        <p className={cn("font-medium mt-2 text-indigo-500 text-start",
         colorByVariant[variant || "default"],
         sizeByVariant[size || "default"],
        
        )}>
            {Math.round(value)} %complete
        </p>
    </div>
  )
}

export default CourseProgress