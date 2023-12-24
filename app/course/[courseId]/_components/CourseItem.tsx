"use client"
import { CustomIcon } from '@/components/custom-icon';
import { BookAIcon, Lock, LockIcon } from 'lucide-react';
import React from 'react'
import { FcReadingEbook } from 'react-icons/fc';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
interface CourseItemProps{
    label: string;
    id: string;
    isCompleted: boolean;
    courseId: string;
    isLocked: boolean;
}

const CourseItem = ({label,id,isCompleted,courseId,isLocked}:CourseItemProps) => {

const pathName = usePathname()

const isActive = pathName?.includes(id)

  return (
    <div className='cursor-pointer'>


    <Link href={`/course/${courseId}/lesson/${id}`}>  
    
    <div className={cn('flex items-center p-3 border-b text-indigo-400 font-medium text-sm  border-slate-400 hover:shadow-lg ', isActive&&"border-r-4 border-amber-400 bg-indigo-100 text-indigo-700 ")}>
        {isLocked ? <Lock size={16} className='mr-3 text-amber-400 '/> : <FcReadingEbook title="Free" className='mr-3 h-4 w-4'/>}
        <p className='w-full'>{label}</p>
      </div></Link>
    </div>

  )
}

export default CourseItem