"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CustomIcon } from "@/components/custom-icon";
import { ListChecks, PlusCircle } from "lucide-react";
import { chaptersSchema, chaptersSchemaType } from "@/lib/validation/course";
import axios from "axios";
import { Chapter, Course } from "@prisma/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import LessonList from "./lesson-list";

interface lessonsProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const lessons = ({ initialData, courseId }: lessonsProps) => {
  const form = useForm<chaptersSchemaType>({
    resolver: zodResolver(chaptersSchema),
    defaultValues: {
      title: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const [chapterAdd, setChapterAdd] = useState(false);
  const [modified, setModified] = useState(false);
  const router = useRouter();
  const editMode = () => {
    setChapterAdd((current) => !current);
  };
  const onSubmit = async (values: chaptersSchemaType) => {
    try {
      console.log("update", values);
      const res = await axios.post(`/api/courses/${courseId}/chapters`, values);

      toast.success("Lesson title created");
      form.reset()
      setChapterAdd(false);
      router.refresh();
     
      // router.push(`/motion-school/teacher/courses/${res?.data.id}`)
    } catch (err) {
      console.log(err);
      toast.error("something went wrong 😮");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setModified(true);
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData,
      });
      toast.success("Chapters reordered");
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setModified(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/motion-school/teacher/courses/${courseId}/lesson/${id}`);
  };
  return (
    <div className="col-span-6">
      <div className="flex items-center gap-x-2 justify-between mb-4">
        <div className="flex flex-row items-center space-x-2">
          <CustomIcon size="md" icon={ListChecks} />
          <h3 className="text-lg text-slate-800"> Course Lessons</h3>
        </div>

        <Button
          onClick={editMode}
          variant="ghost"
          className="rounded-full"
          title="Add Lessons 😉"
        >
          {chapterAdd ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle size={20} />
            </>
          )}
        </Button>
      </div>

      {chapterAdd && (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600 text-xs">
                      Title
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Lessons' Title"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-x-2">
                <Button type="submit" disabled={isSubmitting} size="sm">
                  Add
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}

      {!chapterAdd && (
        <div>
          {!initialData.chapters.length && "No Lessons are Added"}
          <div>
            <LessonList
              items={initialData.chapters || []}
              onReorder={onReorder}
              onEdit={onEdit}
            />
          </div>
        </div>
      )}

      {!chapterAdd && (
        <p className="text-xs text-slate-500">
          Drag and drop to reorder the lessons
        </p>
      )}
    </div>
  );
};

export default lessons;
