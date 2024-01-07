"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";
// import { useConfettiStore } from "@/hooks/use-confetti-store";
interface CompleteLessonProps {
  courseId: string;
  lessonId: string;
  isCompleted: boolean;
  nextChapterId?: string;
}

const CompleteLesson = ({
  courseId,
  lessonId,
  isCompleted,
  nextChapterId,
}: CompleteLessonProps) => {
  const router = useRouter();
  //   const confetti = useConfettiStore()
  const [isLoading, setIsLoading] = useState(false);

  const onComplete = async () => {
    try {
      setIsLoading(true);

      await axios.put(`/api/courses/${courseId}/chapters/${lessonId}/progress`, {
        isCompleted: !isCompleted
      });
      if (!isCompleted && nextChapterId) {
        router.push(`/course/${courseId}/lesson/${nextChapterId}`);
      }
      toast.success("Progress updated");
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err)
    } finally {
      setIsLoading(false);
    }
  };
  const Icon = isCompleted ? XCircle : CheckCircle;
  return (
    <div>
      <Button
        onClick={onComplete}
        disabled={isLoading}
        type="button"
        className="w-full md:w-auto"
      >
        {" "}
        {isCompleted ? "Not completed" : "Mark as complete"}
        <Icon className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export default CompleteLesson;
