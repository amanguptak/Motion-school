import React from 'react'
import { Button } from '@/components/ui/button';
import axios from 'axios';

interface CompleteLessonProps{
    courseId : string;
    lessonId : string;
    isCompleted : boolean;
    nextChapterId?: string;
}

const CompleteLesson = ({courseId,lessonId,isCompleted,nextChapterId}:CompleteLessonProps) => {
  return (
    <div>
        <Button>Completed</Button>
    </div>
  )
}

export default CompleteLesson