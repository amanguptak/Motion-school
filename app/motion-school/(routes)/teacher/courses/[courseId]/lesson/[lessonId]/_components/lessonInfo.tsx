"use client";
import React, { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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

import { Button } from "@/components/ui/button";
import {
  customizeCourseSchemaType,
  customizeCourseSchema,
} from "@/lib/validation/course";
import { LayoutDashboard, Pencil } from "lucide-react";
import { Chapter, Course } from "@prisma/client";
import { CustomIcon } from "@/components/custom-icon";
import TextEditor from "@/components/text-editor";
interface LessonInfoProps {
  initialData: Chapter
  courseId: string;
  lessonId:string
}

const LessonInfo = ({ initialData, courseId ,lessonId }: LessonInfoProps) => {
 
const router = useRouter()
  const form = useForm<customizeCourseSchemaType>({
    resolver: zodResolver(customizeCourseSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: customizeCourseSchemaType) => {
    try {
      console.log("update", values);
      const res = await axios.patch(`/api/courses/${courseId}/chapters/${lessonId}`, values);
      // form.reset()
      toast.success("Lesson info created");
      router.refresh()
      // router.push(`/motion-school/teacher/courses/${res?.data.id}`)
    } catch (err) {
      console.log(err);
      toast.error("something went wrong 😮");
    }
  };

  return (
    <>
      <div className="col-span-6 mt-4">
      <div className="flex items-center gap-x-2">
            <CustomIcon size="md" icon={LayoutDashboard} />
            <h3 className="text-lg text-slate-800">
              {" "}
              Lesson Info Here
            </h3>
          </div>

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
                        placeholder="Lesson Title"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600 text-xs">
                      Description
                    </FormLabel>

                    <FormControl>
                     <TextEditor
                     placeHolder="Write about Lesson....."
                      {...field}
                     />
                    
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2 justify-end">
                <Button type="submit" disabled={isSubmitting} size="sm">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </>
      </div>
    </>
  );
};

export default LessonInfo;
